appendMarkup();

function initializeStructure() {
    document.write('<!doctype html><html lang="el"><head><body></body></html>');
}

async function appendMarkup() {
    const response = await fetch('https://alpha-editions.github.io/commercial-implementations/' + getAliasFormUrl() + '/markup.html');
    const htmlString = await response.text();
    initializeStructure();
    document.head.innerHTML = new XMLSerializer().serializeToString(returnHtmlHead(returnHtmlFromString(htmlString)));
    document.body.innerHTML = new XMLSerializer().serializeToString(returnNoScriptsHtml(returnHtmlBody(returnHtmlFromString(htmlString))));
    appendExternalScripts();
    appendInternalScript();
}

function returnNoScriptsHtml(html) {
    let externalScripts = [];
    html.querySelectorAll('script').forEach(function(script) {
        externalScripts.push(script.src);
        script.remove();
        if (script.src != '') {
            externalScripts.push(script.src);
        }
        else {
            sessionStorage.setItem('internalScript', script.innerText);
        }
        script.remove();
    });
    sessionStorage.setItem('externalScripts', JSON.stringify(externalScripts));
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

function appendExternalScripts() {
    let script;
    JSON.parse(sessionStorage.getItem('externalScripts')).forEach(function(scriptSrc) {
        script = document.createElement('script');
        script.src = scriptSrc;
        document.body.append(script);
    });
}

function appendInternalScript() {
    const script = document.createElement('script');
    script.innerText = sessionStorage.getItem('internalScript');
    document.body.append('script');
}

function getAliasFormUrl() {
    let url = location.pathname;
    if (url[url.length - 1] == '/') {
        url = url.pop();
    }
    return url.substring(url.lastIndexOf('/') + 1);
}