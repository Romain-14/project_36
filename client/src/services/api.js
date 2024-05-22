
// fichier API pour les appels à l'API
async function get(url) {
    try {
        
        const response = await fetch(url, {
            credentials: "include",
        });
        if (response.status === 401) {
            console.log("Unauthorized");
            return;
        }
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        // gestion de l'erreur
        throw new Error("Error while fetching data", error.message);

    }
  
}

async function post(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        if (response.status === 401) {
            console.log("Unauthorized");
            return;
        }
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        throw new Error("Error while fetching data", error.message);
    }
}

async function patch(url, data) {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });
        if (response.status === 401) {
            console.log("Unauthorized");
            return;
        }
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        throw new Error("Error while fetching data", error.message);
    }
}


async function remove(url) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
        });
        if (response.status === 401) {
            console.log("Unauthorized");
            return;
        }
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        throw new Error("Error while fetching data", error.message);
    }
}

export { get, post };