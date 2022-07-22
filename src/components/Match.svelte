<script lang="ts">
  import type Match from "../modules/Match";
  import GoalInput from "./GoalInput.svelte";
  import Icon from "./Icon.svelte";
  import Shield from "./Shield.svelte";

  export let match: Match;
  const { homeTeam, awayTeam, score } = match;
  let homeTeamGoals = score.homeTeam;
  let awayTeamGoals = score.awayTeam;

  $: console.log(homeTeamGoals, awayTeamGoals);
</script>

<div id="match">
  <Shield team={homeTeam} />
  <GoalInput bind:value={homeTeamGoals} />

  <Icon id="close">close</Icon>

  <GoalInput bind:value={awayTeamGoals}/>
  <Shield team={awayTeam} />
</div>

<style>
  #match {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 1.5rem;
  }
</style>
