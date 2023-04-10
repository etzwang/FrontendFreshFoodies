// returns null if the request failed. Will print and alert any errors.
export const makeHTTPRequest = async (requestOptions, url) => {
    console.log("making request: " + JSON.stringify(requestOptions))
    var response;
    try {
        response = await fetch(url, requestOptions)
    } catch (e) {
        console.log('fetch error:', e.message)
        return null;
    }

    if (response.status && response.status != 200) {
        response = await response.text()
        console.log("request not 200 OK! response: " + response);
        alert(response)
        return null;
    }

    response = await response.json();

    console.log("request succeeded, response: " + JSON.stringify(response))
    return response
}