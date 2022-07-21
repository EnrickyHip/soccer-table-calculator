<script lang="ts">
  export let id: string = "";
</script>

<i class="material-icons" {id}>
  <slot />
</i>

<style>
  #button-back {
    padding-left: 0.4rem;
    padding-top: 0.2rem;
  }

  #button-forward {
    padding: 0.2rem 0.25rem 0 0.25rem;
  }

  #close {
    font-size: 1.5rem;
  }

  .material-icons {
    font-size: 1rem;
  }
</style>
