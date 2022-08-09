<script lang="ts">

  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';
  import { RoundRobinTeam } from 'soccer-tournament';

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
