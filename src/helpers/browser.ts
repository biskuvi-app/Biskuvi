// compatibility for firefox and chromium

import { expect } from "./nullish";
import { err, log } from "./utils";

let currentBrowser: any = null;

function getCurrentBrowser() {
  if (currentBrowser) {
    return currentBrowser;
  }
  try {
    if (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
      log("Browser is detected as Firefox");
      // @ts-expect-error
      currentBrowser = browser;
      return currentBrowser;
    }
  } catch {}

  try {
    log("Browser is detected as Chromium");
    // @ts-expect-error
    currentBrowser = chrome;
    return currentBrowser;
  } catch {
    err("Unsupported browser");
  }
}

export class Browser {
  static browser = getCurrentBrowser() ?? expect<any>("browser");
  static storage = this.browser.storage ?? expect<any>("storage");
  static runtime = this.browser.runtime ?? expect<any>("runtime");
}
