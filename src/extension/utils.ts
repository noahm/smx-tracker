import { ModeSummary, ScoreSummary, Summary } from "../types/schemas";
import { Highscore, RawHighscore } from "./types";

export function newScoreSummary(): ScoreSummary {
  return {
    basic: newModeSummary(),
    easy: newModeSummary(),
    hard: newModeSummary(),
    wild: newModeSummary(),
    dual: newModeSummary(),
    full: newModeSummary(),
  };
}

export function newModeSummary(): ModeSummary {
  return {
    inTotal: newSummary(),
    byLevel: {},
  };
}

export function newSummary(): Summary {
  return {
    passes: 0,
    fullCombos: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
    sixStar: 0,
    apcs: 0,
  };
}

const MODES = [
  'Beginner','Easy','Hard','Wild','Dual','Full','Team',
];
function getModeCategory(difficulty_id: number) {
  return MODES[difficulty_id % MODES.length];
}
/** adds the + suffix as needed */
function getMode(difficulty_id: number) {
  const mode = getModeCategory(difficulty_id);
  if (difficulty_id > 6) {
    return mode + '+';
  }
  return mode;
}

export function processHighscore(raw: RawHighscore): Highscore {
  const { difficulty, score, flags, difficulty_id, grade, ...rest } = raw;
  const flagValue = parseInt(flags, 10);
  const diff_id = parseInt(difficulty_id, 10);
  return {
    ...rest,
    difficultyLevel: parseInt(difficulty, 10),
    score: parseInt(score, 10),
    starsEarned: 7 - parseInt(grade, 10),
    pass: !!(flagValue % 2),
    fullCombo: !!(flagValue & 4),
    modeCategory: getModeCategory(diff_id),
    mode: getMode(diff_id),
  }
}
