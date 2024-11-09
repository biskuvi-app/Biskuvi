// compatibility for firefox and chromium

import { RsOk } from "./result";
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
  static browser = RsOk<any>(getCurrentBrowser());
  static storage = RsOk<any>(this.browser.storage);
  static runtime = RsOk<any>(this.browser.runtime);
}
