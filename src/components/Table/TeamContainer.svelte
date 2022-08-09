<script lang="ts">

  import Shield from '../Shield.svelte';
  import { getStore } from "../../store/roundrobin";
  import { RoundRobinTeam } from 'soccer-tournament';

  export let team: RoundRobinTeam;

  const tournament = getStore();
  const { classification } = $tournament;

  function getClassification(team: RoundRobinTeam): string {
    const classified = classification.get(team);
    return classified ? classified : "";
  }

</script>

<td class={getClassification(team)}>
  {team.position}
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
<td id="last-matches">
  {#each team.lastResults as result}
    <span class={result}></span>
  {/each}
</td>

<style>
  #last-matches {
    width: 4rem;
  }

  #last-matches span {
    display: inline-block;
    border-radius: 50%;
    height: 7px;
    width: 7px;
    margin: 0 2px;
  }

  .win {
    background-color: rgb(40, 148, 36);
  }

  .draw {
    background-color: rgb(172, 172, 172);
  }
  .lose {
    background-color: rgb(255, 0, 0);
  }

  div.team {
    display: flex;
    align-items: center;
    min-width: 12rem;
  }

  #percentage {
    width: 3rem;
  }

  .first {
    background-color: rgb(47, 189, 189);
    color: white;
  }

  .classified1 {
    background-color: rgb(69, 202, 113);
    color: white;
  }
  .classified2 {
    background-color: rgb(21, 134, 59);
    color: white;
  }

  .classified3 {
    background-color: rgb(126, 21, 44);
    color: white;
  }

  .playoff {
    background-color: rgb(160, 0, 0);
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
  </style>

