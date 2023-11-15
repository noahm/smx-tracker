import React from "react";
import { useReplicant } from "./useReplicant";
import { PlayerStats } from "../types/schemas";

export function PlayerStats() {
  const [stats] = useReplicant<PlayerStats>('playerStats');

  if (!stats) {
    return <p>No player info loaded</p>;
  }

  return (
    <table>
      <tbody>
        <tr><th>ID</th><td>{stats.id}</td></tr>
        <tr><th>Username</th><td>{stats.username}</td></tr>
        <tr><th>Picture</th><td><img src={`https://data.stepmaniax.com/${stats.picture_path}`} style={{ height: '100px', width: '100px' }} /></td></tr>
      </tbody>
    </table>
  );
}