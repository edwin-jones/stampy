chrome.browserAction.onClicked.addListener(
    function (tab) {
        console.info("stampy: activated");
        chrome.tabs.executeScript(tab.id, { file: 'content.js' });
        console.info("stampy: deactivated");
    });