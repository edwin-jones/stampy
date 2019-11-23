// use an anon function to avoid polluting the environment after the script is run
(function () {
    console.info("stampy - running unix timestamp conversion for page");

    const timerName = "stampy - document body parsing took";
    console.time(timerName);

    function replaceTimestamp(value) {
        let date = new Date(value * 1000);
        let locale = window.navigator.language;
        let replacement = `${date.toLocaleDateString(locale)} @ ${date.toLocaleTimeString(locale)} (UTC)`;

        return replacement;
    }

    function filterInvalidTextNodes(node) {

        // invisible elements should not be considered for timestamp conversion
        if (node.parentElement.style.display === 'none') {
            return NodeFilter.FILTER_SKIP;
        }

        return NodeFilter.FILTER_ACCEPT;
    }

    const timestampRegex = RegExp("[0-9]{10}");
    const nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT, filterInvalidTextNodes);

    let node;
    while (node = nodeIterator.nextNode()) {
        node.textContent = node.textContent.replace(timestampRegex, replaceTimestamp);
    }

    console.timeEnd(timerName);
    console.info(`stampy - timestamp conversion completed`);
})();