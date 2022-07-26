<script lang="ts">

  import type RoundRobinTeam from '../../API/RoundRobinTeam';
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';
  import type { SortEventDetail } from '../../app';
  import { position } from '../../utils/sort';

  export let teams: RoundRobinTeam[];
  let sortAttribute = position;

  function sort(event: SortEventDetail): void {
    const { sortBy } = event.detail; // sortBy é a função pra ordenar
    sortAttribute = sortBy; //sortAttribute salva a função de ordenação
    teams = sortBy(teams); //executa a ordenaçãp
  }

  //simula um event enviado para a ordenação específica ser executada enquanto o inclui novas partidas
  $: teams && sort({ detail: { sortBy: sortAttribute } });

</script>

<div>
  <table>
    <Thead on:sort={sort}/>
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
