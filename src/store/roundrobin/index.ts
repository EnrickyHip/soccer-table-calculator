import { writable } from 'svelte/store';
import initialState from './initialState';

const roundrobin = writable(initialState);

export default roundrobin;
