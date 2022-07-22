<script lang="ts">
  import type { RoundList } from "../../API/types/types";;
  import Matches from "./Matches.svelte";
  import RoundsHeader from "./RoundsHeader.svelte";

  let roundNumber = 1;
  export let rounds: RoundList;

  function prevRound(): void {
    if (roundNumber === 1) return;
    roundNumber--
  }

  function nextRound(): void {
    if (roundNumber === rounds.length) return;
    roundNumber++
  }
</script>

<section id="rounds">
  <RoundsHeader {rounds} {roundNumber} on:prev-round={prevRound} on:next-round={nextRound} />
  <Matches {rounds} {roundNumber} />
</section>

<style>
  #rounds {
    min-width: 20%;
    max-width: 70%;
    border: 1px solid rgb(221, 221, 221);
    margin: 2rem;
    height: 100%;
  }
</style>
