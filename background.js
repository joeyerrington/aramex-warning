chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('Tab updated, checking domain...');
  if (changeInfo.url) {
    checkDomain(changeInfo.url);
  }
});

function checkDomain(url) {
  const aramexDomains = [
    "au.loopearplugs.com",
    "*://*.loopearplugs.com",
    "*://*.fantasticfurniture.com.au",
    "https://www.fantasticfurniture.com.au",
    "*://*.github.com"
  ];
  const currentDomain = new URL(url).hostname;
  console.log('Current domain:', currentDomain);

  const isAramexDomain = aramexDomains.some(domain => {
    if (domain.startsWith("*://")) {
      const domainPattern = domain.replace("*://", "").replace("*.", "");
      return currentDomain.includes(domainPattern);
    } else {
      return currentDomain === domain;
    }
  });

  if (isAramexDomain) {
    chrome.browserAction.setIcon({
      path: {
        "16": "icons/aramex.png"
      }
    });
    console.log("This site uses Aramex");
  } else {
    chrome.browserAction.setIcon({
      path: {
        "16": "icons/safe.png"
      }
    });
    console.log("This site is safe for now");
  }
}