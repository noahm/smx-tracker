import React from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatedNumber } from '../common/animatedNumber';
import { useReplicant } from '../common/useReplicant';
import type { ScoreSummary, Summary } from '../types/schemas';

const params = new URL(document.location.href);
let mode = (params.searchParams.get('mode') as keyof ScoreSummary) || 'wild';
// @ts-expect-error just catching the normal human value and collapsing it down
if (mode === 'beginner') {
  mode = 'basic';
}

let color = params.searchParams.get('color') ?? undefined;
const colorBank = [
  { mode: 'basic', color: '#03da00' },
  { mode: 'easy', color: '#d3b211' },
  { mode: 'hard', color: '#a90a12' },
  { mode: 'wild', color: '#3406bc' },
  { mode: 'dual', color: '#1d72af' },
  { mode: 'full', color: '#00d0b8' },
];
if (color) {
  color = '#' + color;
} else {
  color = colorBank.find((c) => c.mode === mode)?.color;
}

export function Index() {
  const [scoreSummary] = useReplicant<ScoreSummary>('scoreSummary');
  const [stat] = useReplicant<keyof Summary>('singleCountStat');

  const value = scoreSummary?.[mode]?.inTotal?.[stat ?? 'fullCombos'];
  return <AnimatedNumber value={value} color={color} />;
}

const root = createRoot(document.getElementById('root')!);
root.render(<Index />);
