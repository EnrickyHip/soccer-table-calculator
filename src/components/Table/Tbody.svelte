<script lang="ts">
    import type RoundRobinTeam from '../../API/RoundRobinTeam';
    import Team from './Team.svelte';
    import { flip } from 'svelte/animate';

    export let teams: RoundRobinTeam[];
</script>

<tbody>
  {#each teams as team (team.id)}
    <tr animate:flip={{duration: 600}}>
      <Team {team}/>
    </tr>
  {/each}
</tbody>

<style>

  tr:nth-child(2n-1) {
    background-color: rgb(245, 245, 245);
  }

  tr {
    height: 41px;
  }

</style>

