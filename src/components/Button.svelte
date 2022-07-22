<script lang="ts">
  export let classes: string;
  export let disabled = false;
</script>

<button {disabled} class={classes} on:click>
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

  button:disabled {
    cursor: default;
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
