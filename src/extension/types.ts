export interface UserHighscoresInfo {
  /** keyed by song_chart_id, all high scores for a player */
  scores: Record<string, RawHighscore>;
}

export interface RawHighscore {
  song_id: string;
  song_chart_id: string;
  title: string;
  artist: string;
  /** really a number, the difficulty level */
  difficulty: string;
  date: string;
  score: string
  /** bitmask number where first bit is pass/fail, 3rd bit is full combo */
  flags: string;
  /** 0 is beginner, 6 is team, 7 is beginner+... */
  difficulty_id: string;
  /** number of stars "lost", starting at 1, so subtract from 7 */
  grade: string;
}

/** same as RawHighscore, but with some fields converted for ease of use */
export interface Highscore {
  song_id: string;
  song_chart_id: string;
  title: string;
  artist: string;
  difficultyLevel: number;
  date: string;
  score: number;
  pass: boolean;
  fullCombo: boolean;
  starsEarned: number;
  mode: string;
  modeCategory: string;
}
