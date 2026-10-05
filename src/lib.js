export const imgurl = import.meta.env.BASE_URL;

export const apibaseurl = "http://localhost:4000";

export function apiUrl(path = "") {
    return `${apibaseurl}/${String(path).replace(/^\/+/, "")}`;
}

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
        .then(async (res) => {
            const text = await res.text();

            if (!res.ok) {
                let message = `Request failed with status ${res.status}`;
                try {
                    const parsed = JSON.parse(text);
                    message = parsed.message || parsed.error || message;
                } catch {
                    message = text || message;
                }
                throw new Error(message);
            }

            if (!text) return null;

            try {
                return JSON.parse(text);
            } catch {
                throw new Error("The server returned HTML instead of JSON. Check that the API backend is running and the URL is correct.");
            }
        })
        .then((data) => responseHandler(data))
        .catch((error) => {
            console.error("API Error:", error);
            alert(error.message || error);
        });
}
