import { writable } from "svelte/store";

export const mode = writable("dark");
export const setModeTo = (newMode) => mode.set(newMode);
export const toggleMode = () =>
  mode.update((v) => (v === "dark" ? "light" : "dark"));
