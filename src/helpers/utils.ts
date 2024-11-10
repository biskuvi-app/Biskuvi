import { BookmarkUrlState } from "../core/bookmark_url/state";
import { RsOk } from "./result";

export function log(text: any): void {
  let stack = Error("").stack;
  if (stack) {
    let sources = stack.split("\n");
    if (sources.length > 2) {
      let source = sources[2].trimStart();
      source = source.replace(/^at/, "");
      source = source.trimStart();
      console.log(source);
      console.log(text);
      return;
    }
  }
  console.log(text);
}

export function err(text: any): void {
  console.error(text);
}
export function addCss(css: string): void {
  let styleEl: Element | null = document.head.querySelector(
    "style[id='biskuvi']",
  );

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "biskuvi";
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML += css;
}

export function waitElement(selector: string) {
  return new Promise<Element>((resolve) => {
    let obs: MutationObserver | null = null;

    function resolveElement() {
      let el: Element | null = document.querySelector(selector);
      if (el) {
        if (obs) {
          obs.disconnect();
        }
        log(`${selector} found`);
        resolve(el);
        return true;
      } else {
        log(`${selector} not found`);
        return false;
      }
    }

    if (!resolveElement()) {
      obs = new MutationObserver(resolveElement);
      obs.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  });
}

// poll to find value cuz sometimes listener/observer wont work
// stop polling once found. if pause in ms included, poll will resume
export function pollFind<T>(
  findFn: () => any,
  handler: (value: T) => any,
  interval: number,
  pause?: number,
) {
  let timer: Timer | null = null;

  function innerHandler() {
    let found = findFn();
    if (found) {
      clearInterval(RsOk<Timer>(timer));
      if (pause) {
        setTimeout(startInterval, pause);
      }
      handler(found);
    }
  }

  function startInterval() {
    timer = setInterval(innerHandler, interval);
  }

  startInterval();
}
