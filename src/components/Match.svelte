<script lang="ts">
  import type Match from "../modules/Match";
import GoalInput from "./GoalInput.svelte";
  import Icon from "./Icon.svelte";
import Shield from "./Shield.svelte";
  export let match: Match;

  const { homeTeam, awayTeam, score } = match;
</script>

<div id="match">
  <Shield team={homeTeam} />
  <GoalInput />

  <Icon id="close">close</Icon>

  <GoalInput />
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
