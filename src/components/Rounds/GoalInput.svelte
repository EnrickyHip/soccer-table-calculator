<script lang="ts">
  import type { Goal } from "soccer-tournament";
  import { createEventDispatcher } from "svelte/internal";

  export let value: Goal;
  const dispatch = createEventDispatcher();

  async function handleValue(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    value = parseInt(target.value);

    if (isNaN(value)) {
      value = null;
      return;
    };

    if (value > 9) value = value % 10;
    if (value === 0) target.value = target.value[0];
  }

  async function playMatch(event: Event): Promise<void> {
    await handleValue(event);
    dispatch("play-match");
  }

</script>

<input {value} type="number" min="0" max="9" on:input={playMatch}>

<style>
  input {
    width: 1.7rem;
    height: 1.8rem;
    text-align: center;
    border-radius: 3px;
    font-weight: 600;
    border: 1px solid rgb(172, 172, 172);
    margin: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

  input:focus {
    border: 1px solid rgb(94, 94, 94);
    outline: 0;
  }
</style>
