<script lang="ts">
  import Table from './components/Table.svelte';
  import Header from './components/Header.svelte';
  import roundrobin from './store/roundrobin';
</script>

<Header />

<main>
  <Table teams={$roundrobin.teams} />
</main>

<style>

</style>
