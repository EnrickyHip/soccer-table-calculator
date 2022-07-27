<script lang="ts">
import type RoundRobinTeam from "src/API/RoundRobinTeam";

  import { createEventDispatcher } from "svelte/internal";
  const dispatch = createEventDispatcher();

  function sort(attribute: keyof RoundRobinTeam, event: Event) {
    const target = event.target as HTMLTableCellElement;
    const oldSort = document.querySelector(".sort") as HTMLTableCellElement;

    oldSort.classList.remove("sort");
    target.classList.add("sort");

    dispatch("sort", { attribute });
  }

</script>

<thead>
  <tr>
    <th class="sortable sort" on:click={(event) => sort("position", event)}>#</th>
    <th class="team">Team</th>
    <th class="sortable" on:click={(event) => sort("position", event)}>Pts</th>
    <th class="sortable" on:click={(event) => sort("matchesPlayed", event)}>M</th>
    <th class="sortable" on:click={(event) => sort("wins", event)}>W</th>
    <th class="sortable" on:click={(event) => sort("draws", event)}>D</th>
    <th class="sortable" on:click={(event) => sort("losses", event)}>L</th>
    <th class="sortable" on:click={(event) => sort("goals", event)}>G</th>
    <th class="sortable" on:click={(event) => sort("counterGoals", event)}>CG</th>
    <th class="sortable" on:click={(event) => sort("goalDifference", event)}>DIF</th>
    <th class="sortable" on:click={(event) => sort("percentage", event)}>%</th>
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
