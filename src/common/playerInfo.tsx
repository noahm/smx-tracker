import React from 'react';
import { useReplicant } from './useReplicant';
import { type PlayerStats as PlayerStatsType, type ScoreSummary, type DisplayMode } from '../types/schemas';
import './playerInfo.css';

import apcImg from './images/7.png';
import sixImg from './images/6.png';
import fiveImg from './images/5.png';
import fourImg from './images/4.png';

interface Props {
  silentFailure?: boolean;
}

export function PlayerStats(props: Props) {
  const [stats] = useReplicant<PlayerStatsType>('playerStats');
  const [displayMode] = useReplicant<DisplayMode>('displayMode', 'wild');
  const [displayStyle] = useReplicant<'inTotal' | 'byLevel'>('displayStyle', 'inTotal');
  const [scoreSummary] = useReplicant<ScoreSummary>('scoreSummary');

  if (!stats) {
    if (props.silentFailure) {
      return null;
    }

    return <p>No player info loaded</p>;
  }

  const summary = scoreSummary?.[displayMode];
  const byLevel = summary?.byLevel;
  const inTotal = summary?.inTotal;

  let body: JSX.Element | undefined;

  if (displayStyle === 'inTotal') {
    body = (
      <>
        <tr>
          <th colSpan={2}>{displayMode} mode</th>
        </tr>
        <tr>
          <th>
            <img height="30px" src={apcImg} />
          </th>
          <td>{inTotal?.apcs}</td>
        </tr>
        <tr>
          <th>
            <img height="30px" src={sixImg} />
          </th>
          <td>{inTotal?.sixStar}</td>
        </tr>
        <tr>
          <th>
            <img height="30px" src={fiveImg} />
          </th>
          <td>{inTotal?.fiveStar}</td>
        </tr>
        <tr>
          <th>
            <img height="30px" src={fourImg} />
          </th>
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
      </>
    );
  } else if (byLevel) {
    const levels = Object.keys(byLevel)
      .map((k) => parseInt(k, 10))
      .sort((a, b) => a - b);
    body = (
      <>
        <tr>
          <th>{displayMode} mode</th>
          {levels.map((lvl) => (
            <th key={lvl}>{lvl}</th>
          ))}
        </tr>
        <tr>
          <th>
            <img height="30px" src={apcImg} />
          </th>
          {levels.map((lvl) => (
            <td key={lvl}>{byLevel[lvl].apcs}</td>
          ))}
        </tr>
        <tr>
          <th>
            <img height="30px" src={sixImg} />
          </th>
          {levels.map((lvl) => (
            <td key={lvl}>{byLevel[lvl].sixStar}</td>
          ))}
        </tr>
        <tr>
          <th>
            <img height="30px" src={fiveImg} />
          </th>
          {levels.map((lvl) => (
            <td key={lvl}>{byLevel[lvl].fiveStar}</td>
          ))}
        </tr>
        <tr>
          <th>
            <img height="30px" src={fourImg} />
          </th>
          {levels.map((lvl) => (
            <td key={lvl}>{byLevel[lvl].fourStar}</td>
          ))}
        </tr>
        <tr>
          <th>Full Combos</th>
          {levels.map((lvl) => (
            <td key={lvl}>{byLevel[lvl].fullCombos}</td>
          ))}
        </tr>
        <tr>
          <th>Passes</th>
          {levels.map((lvl) => (
            <td key={lvl}>{byLevel[lvl].passes}</td>
          ))}
        </tr>
      </>
    );
  }

  return (
    <table className="player-info">
      <tbody>
        <tr>
          <th colSpan={50}>
            <img
              src={`https://data.stepmaniax.com/${stats.picture_path}`}
              style={{ height: '20px', width: '20px', borderRadius: '10px', verticalAlign: 'middle' }}
            />{' '}
            {stats.username}
          </th>
        </tr>
        {body}
      </tbody>
    </table>
  );
}
