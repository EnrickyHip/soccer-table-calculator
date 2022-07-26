<script lang="ts">
  export let logo: string;
  export let href: string;
  export let alt: string;
</script>

<div>
  <a {href}>
    <button>
      <img width="40px" src={logo} {alt}>
      <slot />
    </button>
  </a>
</div>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 7rem;
    width: 15rem;
    font-size: 1.5rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 4px;
    border: 2px solid rgb(121, 121, 121);
  }

  button:hover {
    background-color: rgb(235, 235, 235);
  }

  img {
    margin-right: 1.5rem;
  }
</style>
