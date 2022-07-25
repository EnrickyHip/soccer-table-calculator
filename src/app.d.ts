/// <reference types="@sveltejs/kit" />

import type RoundRobinTeam from './API/RoundRobinTeam';

export type SortFn = (teams: RoundRobinTeam[]) => RoundRobinTeam[]
export interface SortEventDetail {
  detail: {
    sortBy : SortFn
  }
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}
