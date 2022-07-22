<script lang="ts">
    import type RoundRobinTeam from '../../modules/RoundRobinTeam';
    import Shield from '../Shield.svelte';
    export let teams: RoundRobinTeam[];
</script>

<tbody>
  {#each teams as team, index (team.id)}
    <tr>
      <td>{index + 1}</td>

      <td>
        <div class="team">
          <Shield {team} />
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
      <td id="percentage">{team.percentage.toFixed(2)}</td>
    </tr>
  {/each}
</tbody>

<style>
  td {
    min-width: 2rem;
    text-align: center;
    font-size: 1.05rem;
    border: 1px solid;
    padding: 0.5rem;
    border-color: rgb(221, 221, 221);
  }

  tr {
    height: 2.5rem;
  }

  div.team {
    display: flex;
    align-items: center;
    min-width: 12rem;
  }

  #percentage {
    width: 3rem;
  }
</style>

