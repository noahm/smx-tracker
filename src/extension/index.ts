import type NodeCG from '@nodecg/types';
import type { PlayerStats, PlayerId } from '../types/schemas';

module.exports = function (nodecg: NodeCG.ServerAPI) {
	nodecg.log.info("Hello, from your bundle's extension!");

	const playerIdReplicant = nodecg.Replicant<PlayerId>('playerId');
	
	playerIdReplicant.on("change", (newValue) => {
		if (newValue) {
			updatePlayerStats(nodecg, newValue);
		}
	});
};


async function updatePlayerStats(nodecg: NodeCG.ServerAPI, playerId: number | undefined) {
	const statsReplicant = nodecg.Replicant<PlayerStats>('playerStats');
	if (!playerId) {
		statsReplicant.value = undefined;
		return;
	}
	if (playerId === statsReplicant.value?.id) {
		nodecg.log.info('defer player update, already fetched')
		return;
	}

	const req = await fetch(`https://statmaniax.com/api/users/${playerId}`);
	const resp = await req.json();
	const newStats = {
		id: playerId,
		username: resp.users[0].username,
		picture_path: resp.users[0].picture_path,
	}

	nodecg.log.info({newStats});
	statsReplicant.value = newStats;
}