<script lang="ts">
  import type RoundRobinTeam from '../modules/RoundRobinTeam';
  import Shield from './Shield.svelte';
  export let teams: RoundRobinTeam[];
</script>

<table>
  <thead>
    <tr>
      <th>#</th>
      <th class="team">Team</th>
      <th>Pts</th>
      <th>M</th>
      <th>W</th>
      <th>D</th>
      <th>L</th>
      <th>G</th>
      <th>CG</th>
      <th>DIF</th>
      <th>%</th>
    </tr>
  </thead>
  {#each teams as team, index (team.id)}
    <tr>
      <td>{index + 1}</td>

      <td>
        <div class="team">
          <Shield team={team} />
          {team.name}
        </div>
      </td>

      <td>{team.points}</td>
      <td>{team.matchesPlayed}</td>
      <td>{team.wins}</td>
      <td>{team.draws}</td>
      <td>{team.losses}</td>
      <td>{team.goals}</td>
      <td>{team.counterGoals}</td>
      <td>{team.goalDifference}</td>
      <td>{team.percentage}</td>
    </tr>
  {/each}
</table>

<style>
  table, td, th {
    border: 1px solid;
    padding: 0.5rem;
    border-color: rgb(221, 221, 221);
  }

  thead {
    background-color: rgb(241, 241, 241);
  }

  td {
    min-width: 2rem;
    text-align: center;
  }

  tr {
    height: 2.5rem;
  }

  table {
    border-collapse: collapse;
    overflow-x: auto;
    margin: 2rem;
  }

  th.team {
    text-align: left;
  }

  div.team {
    display: flex;
    align-items: center;
    min-width: 12rem;
  }
</style>
