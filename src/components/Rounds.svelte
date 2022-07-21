<script lang="ts">
  import type { RoundList } from "../modules/RoundRobinChampionship";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import Match from "./Match.svelte";

  let round = 1;
  export let rounds: RoundList;

  function prevRound(): void {
    if (round === 1) return;
    round--
  }

  function nextRound(): void {
    if (round === rounds.length) return;
    round++
  }
</script>

<div id="rounds">
  <div id="header">
    <Button on:click={prevRound} classes="round-button">
      <Icon id="button-back">
        arrow_back_ios
      </Icon>
    </Button>

    <span>
      {round}º round
    </span>

    <Button on:click={nextRound} classes="round-button">
      <Icon id="button-forward">
        arrow_forward_ios
      </Icon>
    </Button>
  </div>

  <div id="matches">
    {#each rounds[round - 1] as match (match.id)}
      <Match {match} />
    {/each}
  </div>
</div>

<style>
  #rounds {
    min-width: 20%;
    max-width: 70%;
    border: 1px solid rgb(221, 221, 221);
    margin: 2rem;
    height: 100%;
  }

  #matches {
    margin: 1rem;
  }

  #header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(241, 241, 241);
  }
</style>
