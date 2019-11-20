console.info("stampy: running unix timestamp conversion");

let replaceTimestamp = function(value) {
    let date = new Date(value * 1000);
    let replacement = date.toISOString();

    return replacement;
}

const timestampRegex = RegExp("[0-9]{6,10}");
let dom = document.getElementsByTagName("div");

for (const element of dom) {

    if(timestampRegex.test(element.innerHTML))
    {
        console.info(`stampy: candidate found at ${element.tagName} with content ${element.innerHTML}`);
        element.innerHTML = element.innerHTML.replace(timestampRegex, replaceTimestamp);
        console.info(`stampy: candidate replaced`);
    }
}

console.info("stampy: timestamp conversion completed");
