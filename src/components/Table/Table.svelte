<script lang="ts">

  import type RoundRobinTeam from '../../API/RoundRobinTeam';
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';
  import type { SortEventDetail } from '../../app';
  import { sortBy } from '../../utils/sort';

  export let teams: RoundRobinTeam[];
  let sortAttribute: keyof RoundRobinTeam; // salva o último attributo de ordenação

  function sort(event: SortEventDetail): void {
    const { attribute } = event.detail; // sortBy é a função pra ordenar
    sortAttribute = attribute;
    teams = sortBy(teams, attribute); //executa a ordenaçãp
  }

  //simula um event enviado para a ordenação específica a ser executada enquanto o usuário inclui novas partidas
  $: teams && sort({ detail: { attribute: sortAttribute } });

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
