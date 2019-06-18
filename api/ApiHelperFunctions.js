
export function trailingSlashIt(url) {
    if (!url.endsWith('/')) {
        url += '/';
    }
    return url;
}

export function buildQueryString(parameters) {
    let queryString = '';
    if (typeof(parameters) === 'string') {
        queryString = parameters;
    } else if (typeof(parameters) === 'object') {
        queryString = Object.keys(parameters).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key])
        }).join('&');
    }
    return queryString;
}

export function buildApiUrl(baseUrl, parameters) {
    return trailingSlashIt(baseUrl) + '?' + buildQueryString(parameters);
}