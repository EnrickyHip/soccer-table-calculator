<script lang="ts">
  import type { ClassificationNames } from "src/app";
  export let classificationNames: ClassificationNames;
  const classificationKeys = Object.keys(classificationNames) as (keyof ClassificationNames)[];
</script>

<ul>
  {#each classificationKeys as key (key) }
  <li>
    <div class="color {key}"></div>
    {classificationNames[key]}
  </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  .color {
    height: 1.5rem;
    width: 1.5rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2px;
  }

  @media (max-width: 600px) {
    ul {
      display: flex;
      flex-wrap: wrap;
    }

    li {
      margin-right: 1rem;
    }
  }
</style>
