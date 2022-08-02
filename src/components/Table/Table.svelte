<script lang="ts">

  import type RoundRobinTeam from '../../API/RoundRobinTeam';
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';

  export let teams: RoundRobinTeam[];

</script>

<div>
  <table>
    <Thead />
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
