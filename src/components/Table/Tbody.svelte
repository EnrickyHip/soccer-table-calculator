<script lang="ts">
    import TeamContainer from './TeamContainer.svelte';
    import { flip } from 'svelte/animate';
    import type { RoundRobinTeam } from 'soccer-tournament';

    export let teams: RoundRobinTeam[];
</script>

<tbody>
  {#each teams as team (team.id)}
    <tr animate:flip={{duration: 600}}>
      <TeamContainer {team}/>
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

