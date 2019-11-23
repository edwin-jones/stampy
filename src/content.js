console.info("stampy - running unix timestamp conversion for page");

const timerName = "stampy - document body parsing took";
console.time(timerName);

const replaceTimestamp = function (value) {
    let date = new Date(value * 1000);
    let locale = window.navigator.userLanguage || window.navigator.language;
    let replacement = `${date.toLocaleDateString(locale)} @ ${date.toLocaleTimeString(locale)} (UTC)`;

    return replacement;
}


const timestampRegex = RegExp("[0-9]{10}");
const nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);

let matchCounter = 0;
let node;

while (node = nodeIterator.nextNode()) {
    node.textContent = node.textContent.replace(timestampRegex, replaceTimestamp);
}

console.timeEnd(timerName);
console.info(`stampy - timestamp conversion completed with ${matchCounter} text node(s) altered`);
