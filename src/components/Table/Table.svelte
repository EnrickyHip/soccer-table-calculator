<script lang="ts">

  import type RoundRobinTeam from '../../API/RoundRobinTeam';
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';
  import type { SortEventDetail } from '../../app';
  import { index } from './sort';

  export let teams: RoundRobinTeam[];
  let sortAttribute = index;

  $: teams && sort({ detail: { sortBy: sortAttribute } });;

  function sort(event: SortEventDetail): void {
    const { sortBy } = event.detail;
    sortAttribute = sortBy;
    teams = sortBy(teams);
  }

</script>
<div>
  <table>

    <Thead on:sort={sort}/>
    <Tbody {teams} />

  </table>
</div>

<style>
  div {
    overflow-x: auto;
  }
  table {
    padding: 0.3rem;
    margin: 2rem;
  }

  @media (max-width: 600px) {
  div {
    width: 500px;
  }
  }

</style>
