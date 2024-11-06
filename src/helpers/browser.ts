// compatibility for firefox and chromium

import { expect } from "./nullish";
import { err, log } from "./utils";

export class Browser {
  static browser = (() => {
    try {
      if (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        log("Browser is detected as Firefox");
        // @ts-expect-error
        return browser;
      }
    } catch {}
    try {
      log("Browser is detected as Chromium");
      // @ts-expect-error
      return chrome;
    } catch {
      err("Unsupported browser");
    }
  })();
  static storage = this.browser.storage ?? expect<any>("storage");
  static runtime = this.browser.runtime ?? expect<any>("runtime");
  static offscreen = this.browser.offscreen ?? expect<any>("offscreen");
}
