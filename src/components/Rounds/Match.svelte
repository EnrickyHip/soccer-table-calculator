<script lang="ts">
  import GoalInput from "./GoalInput.svelte";
  import Icon from "../Icon.svelte";
  import Shield from "../Shield.svelte";
  import { getStore } from "../../store/roundrobin";
  import type { Match } from "soccer-tournament";

  export let match: Match;

  const tournament = getStore();
  const { homeTeam, awayTeam, score } = match;
  let homeTeamGoals = score.homeTeam;
  let awayTeamGoals = score.awayTeam;

  function playMatch(): void {
    tournament.playMatch(match, {
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
