appendMarkup();

function initializeStructure() {
    document.write('<!doctype html><html lang="el"><head><body></body></html>');
}

async function appendMarkup() {
    const response = await fetch('https://alpha-editions.github.io/commercial-implementations/' + getAliasFromUrl() + '/markup.html');
    const htmlString = await response.text();
    initializeStructure();
    document.head.innerHTML = new XMLSerializer().serializeToString(returnHtmlHead(returnHtmlFromString(htmlString)));
    document.body.innerHTML = new XMLSerializer().serializeToString(returnNoScriptsHtml(returnHtmlBody(returnHtmlFromString(htmlString))));
    appendImplementationScripts();
}

function stripHtmlFromScripts(html) {
    let implementationScriptSrcs = [];
    html.querySelectorAll('script').forEach(function(script) {
        implementationScriptSrcs.push(script.src);
        script.remove();
    });
    sessionStorage.setItem('implementationScriptSrcs', JSON.stringify(implementationScriptSrcs));
    return html;
}

function returnHtmlHead(html) {
    return html.head;
}

function returnHtmlBody(html) {
    return html.body;
}

function returnHtmlFromString(string) {
    const parser = new DOMParser();
    return parser.parseFromString(string, 'text/html');
}

function appendImplementationScripts() {
    let script;
    JSON.parse(sessionStorage.getItem('implementationScriptSrcs')).forEach(function(scriptSrc) {
        script = document.createElement('script');
        script.src = scriptSrc;
        document.body.append(script);
    });
}

function getAliasFromUrl() {
    let url = location.pathname;
    const urlLastIndex = url.length - 1;
    if (url[urlLastIndex] == '/') {
        url = url.slice(0, urlLastIndex);
    }
    return url.substring(url.lastIndexOf('/') + 1);
}