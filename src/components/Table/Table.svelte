<script lang="ts">

  import type RoundRobinTeam from '../../API/RoundRobinTeam';
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';
  import type { SortEventDetail } from '../../global';
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

<table>

  <Thead on:sort={sort}/>
  <Tbody {teams} />

</table>

<style>
  table {
    padding: 0.3rem;
    overflow-x: auto;
    margin: 2rem;
  }

</style>
