<script lang="ts">
  import { createEventDispatcher } from "svelte/internal";
  import type { SortFn } from "../../global";
  import * as sort from "./sort";

  const dispatch = createEventDispatcher();

  const sortBy = (sortBy: SortFn, event: Event) => {
    const target = event.target as HTMLTableCellElement;
    const oldSort = document.querySelector(".sort") as HTMLTableCellElement;

    oldSort.classList.remove("sort");
    target.classList.toggle("sort");

    dispatch("sort", { sortBy });
  }

</script>

<thead>
  <tr>
    <th class="sortable sort" on:click={(event) => sortBy(sort.index, event)}>#</th>
    <th class="team">Team</th>
    <th class="sortable" on:click={(event) => sortBy(sort.index, event)}>Pts</th>
    <th class="sortable" on:click={(event) => sortBy(sort.matches, event)}>M</th>
    <th class="sortable" on:click={(event) => sortBy(sort.wins, event)}>W</th>
    <th class="sortable" on:click={(event) => sortBy(sort.draws, event)}>D</th>
    <th class="sortable" on:click={(event) => sortBy(sort.losses, event)}>L</th>
    <th class="sortable" on:click={(event) => sortBy(sort.goals, event)}>G</th>
    <th class="sortable" on:click={(event) => sortBy(sort.counterGoals, event)}>CG</th>
    <th class="sortable" on:click={(event) => sortBy(sort.difference, event)}>DIF</th>
    <th class="sortable" on:click={(event) => sortBy(sort.percentage, event)}>%</th>
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
