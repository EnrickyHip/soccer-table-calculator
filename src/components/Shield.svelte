<script lang="ts">
  import type Team from "../API/Team";
  export let team: Team;
  export let classes = "";
</script>

<img class={classes} src={`./images/${team.shield}`} alt={team.name}>

<style>
  img {
    max-height: 1.5rem;
    max-width: 1.4rem;
    padding-right: 0.7rem;
    padding-left: 0.5rem;
  }

  img.round {
    max-height: 1.9rem;
    max-width: 1.8rem;
  }
</style>
