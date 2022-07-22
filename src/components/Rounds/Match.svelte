<script lang="ts">
  import type Match from "../../modules/Match";
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

<div id="match">
  <Shield team={homeTeam} />
  <GoalInput bind:value={homeTeamGoals} on:play-match={playMatch}/>

  <Icon id="close">
    close
  </Icon>

  <GoalInput bind:value={awayTeamGoals} on:play-match={playMatch}/>
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
