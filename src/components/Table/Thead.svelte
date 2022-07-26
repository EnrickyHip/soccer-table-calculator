<script lang="ts">
  import { createEventDispatcher } from "svelte/internal";
  import type { SortFn } from "../../app";
  import * as sortFuncs from "../../utils/sort";

  const dispatch = createEventDispatcher();

  const sort = (sortBy: SortFn, event: Event) => {
    const target = event.target as HTMLTableCellElement;
    const oldSort = document.querySelector(".sort") as HTMLTableCellElement;

    oldSort.classList.remove("sort");
    target.classList.toggle("sort");

    // sortBy é a função de sort passada por parâmetro.
    dispatch("sort", { sortBy });
  }

</script>

<thead>
  <tr>
    <th class="sortable sort" on:click={(event) => sort(sortFuncs.index, event)}>#</th>
    <th class="team">Team</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.index, event)}>Pts</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.matches, event)}>M</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.wins, event)}>W</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.draws, event)}>D</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.losses, event)}>L</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.goals, event)}>G</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.counterGoals, event)}>CG</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.difference, event)}>DIF</th>
    <th class="sortable" on:click={(event) => sort(sortFuncs.percentage, event)}>%</th>
    <th>last matches</th>
  </tr>
</thead>

<style>
  thead {
    background-color: rgb(241, 241, 241);
  }

  th.team {
    text-align: left;
  }

  th {
    padding: 0.5rem;
  }

  .sortable {
    cursor: pointer;
  }
</style>
