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
    border: 1px solid;
    padding: 0.5rem;
    border-color: rgb(221, 221, 221);
  }

  table {
    border-collapse: collapse;
    overflow-x: auto;
    margin: 2rem;
  }
</style>
