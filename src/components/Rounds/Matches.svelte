<script lang="ts">
  import type { Round } from "soccer-tournament";
  import Match from "./Match.svelte";

  export let rounds: Round[];
  export let roundNumber: number;
</script>

<div id="matches">
  {#each rounds[roundNumber - 1] as match (match.id)}
    <Match {match} />
  {/each}
</div>

<style>
  #matches {
    margin: 1rem;
  }
</style>
