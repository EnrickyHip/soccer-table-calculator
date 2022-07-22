<script lang="ts">
  import Button from "../Button.svelte";
  import Icon from "../Icon.svelte";
  import { createEventDispatcher } from "svelte/internal"
  import type { RoundList } from "../../modules/RoundRobinChampionship";

  export let roundNumber: number;
  export let rounds: RoundList;

  const dispatch = createEventDispatcher();
  const prevRound = () => dispatch("prev-round");
  const nextRound = () => dispatch("next-round");
</script>

<div id="header">
  <Button disabled={roundNumber === 1} on:click={prevRound} classes="round-button">
    <Icon id="button-back">
      arrow_back_ios
    </Icon>
  </Button>

  <span>
    {roundNumber}º round
  </span>

  <Button disabled={roundNumber === rounds.length} on:click={nextRound} classes="round-button">
    <Icon id="button-forward">
      arrow_forward_ios
    </Icon>
  </Button>
</div>

<style>
    #header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(241, 241, 241);
  }
</style>
