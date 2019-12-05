// use an anon function to avoid polluting the environment after the script is run
(function () {
    console.info("stampy - running unix timestamp conversion for page");

    const timerName = "stampy - document body parsing took";
    console.time(timerName);

    var replaceTimestamp = function(multiplier) {
        return function(value) {
            let date = new Date(value * multiplier);
            let locale = window.navigator.language;
            let replacement = `${date.toLocaleDateString(locale)} @ ${date.toLocaleTimeString(locale)} (UTC)`;
    
            return replacement;
        };
      };

    const replaceSecondTimestamp = replaceTimestamp(1000);
    const replaceMillisecondTimestamp = replaceTimestamp(1);

    function filterInvalidTextNodes(node) {

        // invisible elements should not be considered for timestamp conversion
        if (node.parentElement.style.display === 'none') {
            return NodeFilter.FILTER_SKIP;
        }

        return NodeFilter.FILTER_ACCEPT;
    }

    const millisecondTimestampRegex = RegExp("[0-9]{13}");
    const secondTimestampRegex = RegExp("[0-9]{10}");
    
    const nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, filterInvalidTextNodes);

    let node;

    while (node = nodeIterator.nextNode()) {
        node.textContent = node.textContent.replace(millisecondTimestampRegex, replaceMillisecondTimestamp);
        node.textContent = node.textContent.replace(secondTimestampRegex, replaceSecondTimestamp)
    }

    console.timeEnd(timerName);
    console.info("stampy - timestamp conversion completed");
})();