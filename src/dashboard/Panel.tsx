import React from 'react';
import { useReplicant } from '../common/useReplicant';
import { FieldForm } from '../common/fieldForm';
import { PlayerStats } from '../common/playerInfo';
import { DisplayMode, PlayerId } from '../types/schemas';

export function Panel() {
  const [playerId, updatePlayerId] = useReplicant<PlayerId | undefined>('playerId');
  const [displaymode, updateDisplayMode] = useReplicant<DisplayMode>('displayMode');

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
        <select value={displaymode} onChange={(e) => updateDisplayMode(e.currentTarget.value as DisplayMode)}>
          <option value="basic">Beginner</option>
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
          <option value="wild">Wild</option>
          <option value="dual">Dual</option>
          <option value="full">Full</option>
        </select>
      </p>

      <PlayerStats />
    </>
  );
}
