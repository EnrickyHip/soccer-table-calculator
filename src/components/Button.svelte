<script lang="ts">
  export let classes: string;
</script>

<button class={classes} on:click>
  <slot />
</button>

<style>
  button {
    background-color: rgb(255, 255, 255);
    margin: 8px;
  }

  button:hover {
    cursor: pointer;
  }

  button:focus {
    outline: 0;
    border-color: rgb(221, 221, 221);
  }

  .round-button {
    width: 37px;
    height: 37px;
  }
</style>
