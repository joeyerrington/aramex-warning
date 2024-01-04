chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      checkDomain(tab.url);
    }
  });
  
  function checkDomain(url) {
    const aramexDomains = [
        "loopearplugs.com",
        "fantasticfurniture.com.au",
        "github.com"];
    const currentDomain = new URL(url).hostname;

  if (aramexDomains.includes(currentDomain)) {
    chrome.browserAction.setIcon({ path: {
      "16": "icons/aramex.png"
    }});
    console.log("This site uses Aramex");

  } else {
    chrome.browserAction.setIcon({ path: {
      "16": "icons/safe.png"
    }});
    console.log("This site is safe for now");
  }
}
