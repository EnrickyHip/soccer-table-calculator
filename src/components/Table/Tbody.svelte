<script lang="ts">
    import type RoundRobinTeam from '../../API/RoundRobinTeam';
    import Shield from '../Shield.svelte';
    import { flip } from 'svelte/animate';
    export let teams: RoundRobinTeam[];

    const first = (index: number) => index === 1;
    const classified = (index: number) => index > 1 && index < 6;
    const classified2 = (index: number) => index > 4 && index < 7;
    const classified3 = (index: number) => index > 6 && index < 13;
    const relegated = (index: number) => index > 16;
</script>

<tbody>
  {#each teams as team (team.id)}
    <tr animate:flip={{duration: 450}}>
      <td
        class:first={first(team.index)}
        class:classified={classified(team.index)}
        class:classified2={classified2(team.index)}
        class:classified3={classified3(team.index)}
        class:relegated={relegated(team.index)}
      >
        {team.index}
      </td>

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

  tr:nth-child(2n-1) {
    background-color: rgb(245, 245, 245);
  }
  .first {
    background-color: rgb(47, 189, 189);
    color: white;
  }

  .classified {
    background-color: rgb(69, 202, 113);
    color: white;
  }
  .classified2 {
    background-color: rgb(29, 173, 77);
    color: white;
  }

  .classified3 {
    background-color: rgb(122, 21, 43);
    color: white;
  }

  .relegated {
    background-color: rgb(212, 7, 7);
    color: white;
  }
  td {
    min-width: 2rem;
    text-align: center;
    font-size: 1rem;;
    padding: 0.3rem;
  }

  tr {
    height: 41px;
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

