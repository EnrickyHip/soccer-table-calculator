<script lang="ts">
  import type { SortableAttribute } from "src/API/types";
  import { toggleClasses } from "../../utils/toggleClasses";
  import { getStore } from "../../store/roundrobin";

  const tournament = getStore();
  const { sortBy } = tournament;

  function sort(attribute: SortableAttribute, event: Event) {
    const target = event.target as HTMLTableCellElement;
    const oldSort = document.querySelector(".sort") as HTMLTableCellElement;
    let status: "ascending" | "descending";

    if (oldSort === target) {
      status = toggleClasses(target, "ascending", "descending")
    } else {
      oldSort.classList.remove("sort", "ascending", "descending");
      target.classList.add("sort", "descending");
      status = "descending";
    }

    const direction = status === "ascending" ? -1 : 1;
    sortBy(attribute, direction);
  }

</script>

<thead>
  <tr>
    <th class="sortable sort descending" on:click={(event) => sort("position", event)}>#</th>
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
