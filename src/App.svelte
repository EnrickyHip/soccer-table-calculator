<script lang="ts">
  import Table from './components/Table/Table.svelte';
  import Header from './components/Header.svelte';
  import roundrobin from './store/roundrobin';
  import Rounds from './components/Rounds/Rounds.svelte';
</script>

<Header />

<main>
  <Table teams={$roundrobin.teams} />
  <Rounds rounds={$roundrobin.rounds} />
</main>

<style>
  main {
    display: flex;
    justify-content: space-evenly;
    overflow-x: auto;
  }
</style>
