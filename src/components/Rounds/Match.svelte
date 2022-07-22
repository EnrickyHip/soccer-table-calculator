<script lang="ts">
  import type Match from "../../API/Match";
  import GoalInput from "./GoalInput.svelte";
  import Icon from "../Icon.svelte";
  import Shield from "../Shield.svelte";
  import roundrobin from "../../store/roundrobin";

  export let match: Match;
  const { homeTeam, awayTeam, score } = match;
  let homeTeamGoals = score.homeTeam;
  let awayTeamGoals = score.awayTeam;

  function playMatch(): void {
    roundrobin.playMatch(match, {
      homeTeam: homeTeamGoals,
      awayTeam: awayTeamGoals
    });
  }
</script>

<div class="match">
  <Shield classes="round" team={homeTeam} />
  <GoalInput bind:value={homeTeamGoals} on:play-match={playMatch}/>

  <Icon id="close">
    close
  </Icon>

  <GoalInput bind:value={awayTeamGoals} on:play-match={playMatch}/>
  <Shield classes="round" team={awayTeam} />
</div>

<style>
  .match {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
</style>
