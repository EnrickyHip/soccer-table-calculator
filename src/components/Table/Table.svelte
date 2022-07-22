<script lang="ts">
  import type RoundRobinTeam from '../../API/RoundRobinTeam';
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';

  export let teams: RoundRobinTeam[];
</script>

<table>

  <Thead />
  <Tbody {teams} />

</table>

<style>
  table {
    padding: 0.3rem;
    overflow-x: auto;
    margin: 2rem;
  }

</style>
