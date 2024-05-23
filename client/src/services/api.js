const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = API_URL + "/api/v1";

async function customFetch(endpoint){

    return await fetch(BASE_URL + endpoint, );
}

export { customFetch };