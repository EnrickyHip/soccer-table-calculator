<script lang="ts">
  import type { ClassificationNames } from "src/app";
  import Attributes from "./Attributes.svelte";
import Classification from "./Classification.svelte";

  export let classificationNames: ClassificationNames;
</script>

<caption>
  <Attributes />
  <Classification {classificationNames} />
</caption>

<style>
  caption {
    font-style: italic;
    text-align: justify;
  }

  @media (max-width: 600px) {
    caption {
      margin-bottom: 1rem;
    }
  }
</style>
