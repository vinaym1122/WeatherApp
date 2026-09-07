export const imgurl = import.meta.env.BASE_URL;

export const apibaseurl = "http://localhost:4000/";

export function callApi(reqmethod, apiurl, jsondata, formdata, responseHandler, jwtToken = "") {
    const headers = {};

    if (jsondata) headers["Content-Type"] = "application/json";
    if (jwtToken) headers["Token"] = jwtToken;

    const options = {
        method: reqmethod,
        headers,
        body: jsondata ? JSON.stringify(jsondata) : formdata ? formdata : undefined
    };

    fetch(apiurl, options)
        .then((res) => res.json())
        .then((data) => responseHandler(data))
        .catch((error) => alert(error));
}
