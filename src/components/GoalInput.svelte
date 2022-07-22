<script lang="ts">
  export let value: number;

  function handleValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    value = parseInt(target.value);

    if (isNaN(value)) {
      value = null;
      return;
    };

    if (value > 9) value = value % 10;
    if (value === 0) target.value = target.value[0];
  }

</script>

<input {value} type="number" min="0" max="9" on:input={handleValue}>

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
