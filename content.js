console.info("stampy: running unix timestamp conversion for page");

let replaceTimestamp = function(value) {
    let date = new Date(value * 1000);
    let locale = window.navigator.userLanguage || window.navigator.language;
    let replacement = `${date.toLocaleDateString(locale)} @ ${date.toLocaleTimeString(locale)} (UTC)`;

    return replacement;
}

const timestampRegex = RegExp("[0-9]{10}");
const scriptRegex = RegExp("<[^>]*script");
let dom = document.getElementsByTagName("div");

for (const element of dom) {

    if(scriptRegex.test(element.innerHTML))
    {
        continue;
    }

    if(timestampRegex.test(element.innerHTML))
    {
        console.info(`stampy: candidate found at ${element.tagName.toLowerCase()} element with id: '${element.id || "NONE"}'`);
        element.innerHTML = element.innerHTML.replace(timestampRegex, replaceTimestamp);
        console.info(`stampy: candidate content replaced`);
    }
}

console.info("stampy: timestamp conversion completed");
