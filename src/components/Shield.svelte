<script lang="ts">
  import type Team from "../API/Team";
  export let team: Team;
</script>

<img src={`./images/${team.shield}`} alt={team.name}>

<style>
  img {
    width: 1.5rem;
    padding-right: 0.7rem;
    padding-left: 0.5rem;
  }
</style>
