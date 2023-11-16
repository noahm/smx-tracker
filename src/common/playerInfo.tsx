import React from 'react';
import { useReplicant } from './useReplicant';
import { PlayerStats, ScoreSummary, DisplayMode } from '../types/schemas';

interface Props {
  silentFailure?: boolean;
}

export function PlayerStats(props: Props) {
  const [stats] = useReplicant<PlayerStats>('playerStats');
  const [displayMode] = useReplicant<DisplayMode>('displayMode', 'wild');
  const [scoreSummary] = useReplicant<ScoreSummary>('scoreSummary');

  if (!stats) {
    if (props.silentFailure) {
      return null;
    }
    return <p>No player info loaded</p>;
  }

  const summary = scoreSummary && scoreSummary[displayMode];
  const byLevel = summary?.byLevel;
  const inTotal = summary?.inTotal;

  return (
    <table>
      <tbody>
        <tr>
          <th colSpan={2}>
            <img
              src={`https://data.stepmaniax.com/${stats.picture_path}`}
              style={{ height: '20px', width: '20px', borderRadius: '10px', verticalAlign: 'middle' }}
            />{' '}
            {stats.username}
          </th>
        </tr>
        <tr>
          <th colSpan={2}>{displayMode} mode</th>
        </tr>
        <tr>
          <th>APCs</th>
          <td>{inTotal?.apcs}</td>
        </tr>
        <tr>
          <th>Six Stars</th>
          <td>{inTotal?.sixStar}</td>
        </tr>
        <tr>
          <th>Five Stars</th>
          <td>{inTotal?.fiveStar}</td>
        </tr>
        <tr>
          <th>Four Stars</th>
          <td>{inTotal?.fourStar}</td>
        </tr>
        <tr>
          <th>Full Combos</th>
          <td>{inTotal?.fullCombos}</td>
        </tr>
        <tr>
          <th>Passes</th>
          <td>{inTotal?.passes}</td>
        </tr>
      </tbody>
    </table>
  );
}
