import { writable } from "svelte/store";

export const mode = writable("dark");
export const setModeTo = (newMode) => mode.update(newMode);
