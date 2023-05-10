appendMarkup();

function initializeStructure() {
    document.querySelector('header, footer').remove();
    document.querySelector('.blog-standard').innerHTML('<div id="root" class="position-relative"></div>')
}

async function appendMarkup() {
    const response = await fetch('https://alpha-editions.github.io/commercial-implementations/' + getAliasFromUrl() + '/markup.html');
    const htmlString = await response.text();
    initializeStructure();
    document.head.append(new XMLSerializer().serializeToString(extractLinksFromHtml(returnHtmlHead(returnHtmlFromString(htmlString)))));
    document.querySelector('#root').innerHTML = new XMLSerializer().serializeToString(stripHtmlFromScripts(returnHtmlBody(returnHtmlFromString(htmlString))));
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

function extractLinksFromHtml(html) {
    let implementationLinks = '', clone;
    html.querySelectorAll('link').forEach(function(link) {
        implementationLinks = implementationLinks.concat(JSON.stringify(link));
    });
    sessionStorage.setItem('implementationLinks', implementationLinks);
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