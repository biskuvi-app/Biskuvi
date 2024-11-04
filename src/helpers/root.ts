import { State } from "../helpers/config";

export function rootSelect(sel: string): HTMLElement | undefined | null {
  return State.root?.querySelector(sel);
}

export function rootSelectAll(
  sel: string,
): NodeListOf<HTMLElement> | undefined | null {
  return State.root?.querySelectorAll(sel);
}
