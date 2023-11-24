import React from 'react';
import { useReplicant } from '../common/useReplicant';
import { FieldForm } from '../common/fieldForm';
import type { DisplayMode, PlayerId, Summary } from '../types/schemas';

export function Panel() {
  const [playerId, updatePlayerId] = useReplicant<PlayerId | undefined>('playerId');
  const [displaymode, updateDisplayMode] = useReplicant<DisplayMode>('displayMode');
  const [displayStyle, updateDisplayStyle] = useReplicant<'inTotal' | 'byLevel'>('displayStyle', 'inTotal');
  const [singleCountStat, updateSingleCountStat] = useReplicant<keyof Summary>('singleCountStat', 'fullCombos');

  const strPlayerId = playerId ? playerId.toString() : '';

  return (
    <>
      <p>
        Find your Player ID in the URL after looking yourself up on{' '}
        <a href="https://statmaniax.com/search" target="_blank">
          statmaniax
        </a>
      </p>

      <p>Player ID:</p>
      <FieldForm
        liveValue={strPlayerId}
        onSubmit={(next) => {
          const asNumber = parseInt(next, 10);
          updatePlayerId(isNaN(asNumber) ? undefined : asNumber);
        }}
      />

      <p>
        Display Mode:{' '}
        <select
          value={displaymode}
          onChange={(e) => {
            updateDisplayMode(e.currentTarget.value as DisplayMode);
          }}>
          <option value="basic">Beginner</option>
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
          <option value="wild">Wild</option>
          <option value="dual">Dual</option>
          <option value="full">Full</option>
        </select>
      </p>

      <p>
        Display Style:{' '}
        <select
          value={displayStyle}
          onChange={(e) => {
            updateDisplayStyle(e.currentTarget.value as typeof displayStyle);
          }}>
          <option value="inTotal">Totals</option>
          <option value="byLevel">By Difficulty Lvl</option>
        </select>
      </p>

      <p>
        Stat for solo count:{' '}
        <select
          value={singleCountStat}
          onChange={(e) => {
            updateSingleCountStat(e.currentTarget.value as keyof Summary);
          }}>
          <option value="passes">Passes</option>
          <option value="fullCombos">Full Combos</option>
          <option value="threeStar">3 Stars</option>
          <option value="fourStar">4 Stars</option>
          <option value="fiveStar">5 Stars</option>
          <option value="sixStar">6 Stars</option>
          <option value="apcs">APCs</option>
        </select>
      </p>
    </>
  );
}
