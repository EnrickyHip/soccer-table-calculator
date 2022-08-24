<script lang="ts">
  import Table from '../components/Table/Table.svelte';
  import Title from '../components/Title.svelte';
  import { createRoundRobin } from '../store/roundrobin';
  import Rounds from '../components/Rounds/Rounds.svelte';
  import brasileirao, { classificationNames } from "../store/roundrobin/tournaments/brasileirao";
  import RoundRobinContainer from '../components/RoundRobinContainer.svelte';

  const brasileiraoStore = createRoundRobin(brasileirao);
</script>

<svelte:head>
  <title>Brasileirão Table Calculator</title>
</svelte:head>

<Title>
  Campeonato Brasileiro Série A (Brazil)
</Title>

<RoundRobinContainer>
  <Table {classificationNames} teams={$brasileiraoStore.teams} />
  <Rounds rounds={$brasileiraoStore.rounds} />
</RoundRobinContainer>

