<script lang="ts">
  import Table from '../components/Table/Table.svelte';
  import Title from '../components/Title.svelte';
  import { createRoundRobin } from '../store/roundrobin';
  import Rounds from '../components/Rounds/Rounds.svelte';
  import premierLeague, { classificationNames } from "../store/roundrobin/tournaments/premierLeague";
  import RoundRobinContainer from '../components/RoundRobinContainer.svelte';

  const premierLeagueStore = createRoundRobin(premierLeague);
</script>

<svelte:head>
  <title>Premier League Table Calculator</title>
</svelte:head>

<Title>
  Premier League (England)
</Title>

<RoundRobinContainer>
  <Table {classificationNames} teams={$premierLeagueStore.teams} />
  <Rounds rounds={$premierLeagueStore.rounds} />
</RoundRobinContainer>
