import { State } from "../helpers/config";
import { RsOk } from "./result";

export function rootSelect(sel: string): Element | undefined | null {
  return RsOk<Element>(State.root).querySelector(sel);
}

export function rootSelectAll(
  sel: string,
): NodeListOf<HTMLElement> | undefined | null {
  return RsOk<Element>(State.root).querySelectorAll(sel);
}
