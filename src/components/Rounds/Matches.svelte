<script lang="ts">
  import type { RoundList } from "../../API/types";;
  import Match from "./Match.svelte";

  export let rounds: RoundList;
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
