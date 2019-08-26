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
            return encodeURIComponent(key) + '=' + encodeValue(parameters[key])
        }).join('&');
    }
    return queryString;
}

//allows for value to be an array, which will then be encoded
function encodeValue(value) {
  if ( Array.isArray( value ) ) {
    value = value.join(',');
  }
  return encodeURIComponent(value);
}

export function buildApiUrl(baseUrl, parameters) {
    return trailingSlashIt(baseUrl) + '?' + buildQueryString(parameters);
}