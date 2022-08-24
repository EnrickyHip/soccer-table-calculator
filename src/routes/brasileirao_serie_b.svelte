<script lang="ts">
  import Table from '../components/Table/Table.svelte';
  import Title from '../components/Title.svelte';
  import { createRoundRobin } from '../store/roundrobin';
  import Rounds from '../components/Rounds/Rounds.svelte';
  import brasileiraoB, { classificationNames } from "../store/roundrobin/tournaments/brasileirao_serie_b";
  import RoundRobinContainer from '../components/RoundRobinContainer.svelte';

  const brasileiraoBStore = createRoundRobin(brasileiraoB);
</script>

<svelte:head>
  <title>Brasileirão Table Calculator</title>
</svelte:head>

<Title>
  Campeonato Brasileiro Série B (Brazil)
</Title>

<RoundRobinContainer>
  <Table {classificationNames} teams={$brasileiraoBStore.teams} />
  <Rounds rounds={$brasileiraoBStore.rounds} />
</RoundRobinContainer>

