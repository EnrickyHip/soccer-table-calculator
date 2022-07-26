<script lang="ts">
  import Table from '../components/Table/Table.svelte';
  import Title from '../components/Title.svelte';
  import { createRoundRobin } from '../store/roundrobin';
  import Rounds from '../components/Rounds/Rounds.svelte';
  import brasileirao from "../store/roundrobin/tournaments/brasileirao";
  import RoundRobinContainer from '../components/RoundRobinContainer.svelte';

  let brasileiraoStore = createRoundRobin(brasileirao);
</script>

<svelte:head>
  <title>Brasileirão Table Calculator</title>
</svelte:head>

<Title>
  Campeonato Brasileiro Série A (Brazil)
</Title>

<RoundRobinContainer>
  <Table teams={$brasileiraoStore.teams} />
  <Rounds rounds={$brasileiraoStore.rounds} />
</RoundRobinContainer>
