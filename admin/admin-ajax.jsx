function fetchAdminAjax( action, data ) {
    const url = 'https://stealherstyle.net/wp-admin/admin-ajax.php?action=' + action;
    let init = {};
    if ( data ) {
        init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
    }
    return fetch(url, init)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return json;
        })
        .catch(error => console.error('Error:', error));
}