appendMarkup();

function initializeStructure() {
    document.querySelector('header, footer').remove();
    document.getElementsByClassName('blog-standard')[0].innerHTML = '<div id="root" class="position-relative"></div>';
}

async function appendMarkup() {
    const response = await fetch('https://alpha-editions.github.io/commercial-implementations/' + getAliasFromUrl() + '/markup.html');
    const htmlString = await response.text();
    initializeStructure();
    document.head.insertAdjacentHTML('beforeend', returnLinksFromHtml(returnHtmlHead(returnHtmlFromString(htmlString))));
    document.getElementById('root').innerHTML = new XMLSerializer().serializeToString(stripHtmlFromScripts(returnHtmlBody(returnHtmlFromString(htmlString))));
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

function returnLinksFromHtml(html) {
    let implementationLinks = '', clone;
    html.querySelectorAll('link').forEach(function(link) {
        implementationLinks = implementationLinks.concat(JSON.stringify(link));
    });
    return implementationLinks;
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