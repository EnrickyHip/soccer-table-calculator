<script lang="ts">
  import Thead from './Thead.svelte';
  import Tbody from './Tbody.svelte';
  import { RoundRobinTeam } from 'soccer-tournament';
  import Caption from './Caption/Caption.svelte';
  import type { ClassificationNames } from '../../app';

  export let classificationNames: ClassificationNames;
  export let teams: RoundRobinTeam[];
</script>

<div>
  <table>
    <Thead />
    <Tbody {teams} />
    <Caption {classificationNames} />
  </table>
</div>

<style>
  div {
    overflow-x: auto;
  }
  table {
    padding: 0.3rem;
    margin: 2rem;
    caption-side: bottom;
  }

  @media (max-width: 600px) {
    div {
      width: 500px;
    }

    table {
      caption-side: top;
    }
  }

</style>
