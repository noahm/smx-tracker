import type NodeCG from '@nodecg/types';
import type { PlayerStats, PlayerId, LastUpdated, ScoreSummary } from '../types/schemas';
import { type UserHighscoresInfo } from './types';
import { newModeSummary, newScoreSummary, newSummary, processHighscore } from './utils';

type DiffCategory = keyof LastUpdated;

// poll for updated play data every 10s
const DATA_POLLING_RATE = 10_000;

module.exports = function (nodecg: NodeCG.ServerAPI) {
  nodecg.log.info("Hello, from your bundle's extension!");

  const playerIdReplicant = nodecg.Replicant<PlayerId>('playerId');

  playerIdReplicant.on('change', (newValue) => {
    if (newValue) {
      updatePlayerStats(nodecg, newValue).catch((e) => {
        nodecg.log.error(e);
      });
    }
  });

  setInterval(maybeRefreshStats.bind(nodecg), DATA_POLLING_RATE);
};

async function maybeRefreshStats(this: NodeCG.ServerAPI) {
  this.log.info('Polling for new SMX scores');
  const playerIdRep = this.Replicant<PlayerId>('playerId');
  if (!playerIdRep.value) {
    return;
  }

  const playerId = playerIdRep.value;
  const req = await fetch(`https://statmaniax.com/api/get_users_latest_scores/${playerId}`);
  const latestTimes: LastUpdated = await req.json().catch<LastUpdated>(() => ({
    basic: null,
    dual: null,
    easy: null,
    full: null,
    hard: null,
    wild: null,
  }));
  const modesToUpdate = [] as DiffCategory[];
  const lastUpdatedRep = this.Replicant<LastUpdated>('lastUpdated');
  const lastUpdated = lastUpdatedRep.value!;
  for (const mode of Object.keys(latestTimes) as DiffCategory[]) {
    const lastUpdate = lastUpdated[mode];
    const remoteUpdate = latestTimes[mode];
    // if (!remoteUpdate) {
    // 	continue;
    // }
    if (!lastUpdate || (remoteUpdate && remoteUpdate > lastUpdate)) {
      modesToUpdate.push(mode);
    }
  }

  for (const mode of modesToUpdate) {
    this.log.info(`Pulling updated scores for ${mode} mode`);
    updateScoreDataForMode(this, mode, playerId).catch((e) => {
      this.log.error(e);
    });
  }
}

async function updatePlayerStats(nodecg: NodeCG.ServerAPI, playerId: number | undefined) {
  const statsReplicant = nodecg.Replicant<PlayerStats>('playerStats');
  if (!playerId) {
    statsReplicant.value = undefined;
    return;
  }

  if (playerId === statsReplicant.value?.id) {
    nodecg.log.info('defer player update, already fetched');
    return;
  }

  const req = await fetch(`https://statmaniax.com/api/users/${playerId}`);
  const resp = await req.json();
  const newStats = {
    id: playerId,
    username: resp.users[0].username,
    picture_path: resp.users[0].picture_path,
  };

  nodecg.log.info({ newStats });
  statsReplicant.value = newStats;
}

async function updateScoreDataForMode(nodecg: NodeCG.ServerAPI, mode: DiffCategory, playerId: number) {
  const requestMode = mode === 'basic' ? 'beginner' : mode;
  const req = await fetch(`https://statmaniax.com/api/get_user_highscores_info/${playerId}/${requestMode}`);
  const resp: UserHighscoresInfo = await req.json();

  const summary = newModeSummary();

  for (const rawScore of Object.values(resp.scores)) {
    const score = processHighscore(rawScore);
    const levelSummary = summary.byLevel[score.difficultyLevel] || newSummary();

    if (score.pass) {
      levelSummary.passes++;
      summary.inTotal.passes++;
    }

    if (score.fullCombo) {
      levelSummary.fullCombos++;
      summary.inTotal.fullCombos++;
    }

    if (score.starsEarned === 3) {
      levelSummary.threeStar++;
      summary.inTotal.threeStar++;
    }

    if (score.starsEarned === 4) {
      levelSummary.fourStar++;
      summary.inTotal.fourStar++;
    }

    if (score.starsEarned === 5) {
      levelSummary.fiveStar++;
      summary.inTotal.fiveStar++;
    }

    if (score.starsEarned === 6) {
      levelSummary.sixStar++;
      summary.inTotal.sixStar++;
    }

    if (score.score === 100_000) {
      levelSummary.apcs++;
      summary.inTotal.apcs++;
    }

    summary.byLevel[score.difficultyLevel] = levelSummary;
  }

  const summariesRepl = nodecg.Replicant<ScoreSummary>('scoreSummary', { defaultValue: newScoreSummary() });
  summariesRepl.value[mode] = summary;
  const lastUpdatedRep = nodecg.Replicant<LastUpdated>('lastUpdated');
  lastUpdatedRep.value![mode] = new Date()
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d+Z/, '');
}
