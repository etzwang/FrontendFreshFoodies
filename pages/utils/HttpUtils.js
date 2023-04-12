import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const getUserPersonalFridgeId = async () => {
    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email" : await AsyncStorage.getItem("user_email")
      })
    };
  
    var response = await makeHTTPRequest(requestOptions, "https://looking-glass-api.herokuapp.com/api/me");
    if (response === null) {
      alert("failed to get your login info.")
      return;
    }
    console.log("api/me response: " + JSON.stringify(response));
    return response.fridge_ids[0].toString();
  }

export const getUserPersonalFridgeObject = async () => {
    let personalFridgeId = await getUserPersonalFridgeId();
    var requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      };
    
    var response = await makeHTTPRequest(requestOptions, "https://looking-glass-api.herokuapp.com/api/fridge/" + personalFridgeId);
    if (response === null) {
        alert("failed to get your personal fridge id.")
        return;
      }
      console.log(JSON.stringify(response));
      return response;
}