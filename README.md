# INSTALLATION DU PROJET sur l'ide de la 3WA

Importer votre bdd dans le phpMyAdmin de la 3wa
Récupérer le projet

Dans le terminal :

- se placer dans le répertoire `sites` au minimum
- Récupérer le projet sur git : `git clone`

## BACK

Se rendre sur le dossier `API`

- installer les modules : `npm install`
- créer un fichier .env

Les informations de connexion à la BBD sur le phpmyadmin de la 3wa se trouve sur sa page d'accueil

```Dotenv
DB_HOST=""
DB_USER=""
DB_NAME=""
DB_PASS=""

LOCAL_PORT="9000"

NODE_ENV="production"
CLIENT_URL = "http://prenomnom.ide.3wa.io:9500"

SECRET_SESSION="svVnaKqJkY4A$wY7hKx9JQFhsL12Prqwemnpt1H5bXPZ#coasiS60z6$VejKdDYQ3A7"
```

Fichier server.js

Ajouter/modifier les lignes

```js
// ...

// si déployé sur un service cloud ou autre, une variable d'environnement PORT sera définit et on va l'utiliser
// sinon c'est qu'on est en localhost et on va utiliser la variable qu'on a définit
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const corsOptions = {
    origin: process.env.CLIENT_URL, // le client autorisé à communiquer avec le serveur
    methods: ["GET, POST", "PATCH", "DELETE"], // les méthodes autorisés vers le serveur
    credentials: true, // autorise la réception de cookies depuis "l'origin"
};

app.use(cors(corsOptions));
// ...

// variable d'environnement `NODE_ENV` définit dans le fichier .env
// permets d'avoir le retour dans le terminal pertinent
const domain =
    process.env.NODE_ENV === "production"
        ? `http://romainfournier.ide.3wa.io:${PORT}`
        : `localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(`Server is running at http://${domain}`);
});
```

Et c'est tout pour le `BACK` !!

## FRONT (spécifique à React avec vite.js)

Se rendre sur le dossier `client`

- installer les modules : `npm install`
- créer un fichier .env
- Ajouter la variable d'environnement pour l'url vers votre `API`

```Dotenv
VITE_API_URL="http://prenomnom.ide.3wa.io:9000"
```

- modifier le fichier vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ci-dessous le code à rajouter
  server: {
    host: true, // permets d'accéder au "serveur" front de n'importe où. Configuration à faire dans un environnement "Cloud9"
    port: 9500, //nouveau port à utiliser plutôt que le 5173 par défaut
    proxy: { // c'est une "passerelle"
      '/api': { // toutes les requêtes commençant par /api seront redirigées vers le serveur API (url définit dans le fichier .env de vite)
        target: process.env.VITE_API_URL,
      }
    }
  }
})
```

Avec Vitejs, pour utiliser une variable d'environnement, il faut faire l'instruction suivante :

```js
// A utiliser pour aller chercher les images dans le back
const API_URL = import.meta.env.VITE_API_URL;
```

Il faut également éviter de se répéter, mise en place d'un fichier service/api.js.
Puis appeler cette fonction, en transmettant le endpoint/point de terminaison de la route à atteindre dans le serveur API ET les options quand requis (méthodes, body, headers, credentials ...)

```js
// avec le proxy définit sur "/api" pas besoin de définir l'adresse du serveur API
const BASE_URL = "/api/v1";

async function customFetch(endpoint, options = null){
    const response = await fetch(BASE_URL + endpoint, options );
    return response;
}

export { customFetch };
```

```js
    // exemple d'un fetch sur la route produit donc ( /api/v1/product )
    const response = await customFetch("/product");

    // exemple d'un fetch avec options sur la route auth donc ( /api/v1/auth )
    const response = await customFetch("/auth", {credentials: "include"});

    // autre exemple avec le login
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include",
    }
    const response = await customFetch("/auth/login", options );
```

Maintenant l'application devrait bien tourner 😊
mais ...
on va faire un bonne grosse optimisation...
on va `build` le projet.
Ce qui aura comme effet d'optimiser grandement le projet en minifiant le code , réduisant le nombre de fichier etc.. 
Jeter un oeil au Dossier `dist` créé par le build.
Mais il faut déjà effectuer cette commande et modifier le fichier package.json

Le fichier package.json
Dans "script" ne toucher à rien d'autre que la ligne "preview".
il va falloir rajouter `--port 9500`
ce qui va définir un port spécifique car le `preview` par défaut se lance sur un port qui n'est pas ouvert sur le `cloud9`.

```json
"scripts": {
    "preview": "vite preview --port 9500"
  },
```

Maintenant il faut executer la commande `npm run build`.
Vous pouvez la voir dans script du fichier package.json.
Elle va build l'application comme explique plus haut.
Et donc créé ce fameux dossier `dist`.

Et là bravo vous avez une app qui pète le feu !

Niveau rapidité ça n'aura rien à voir avec un dossier hors build, appréciez la vrai puissance de react 😍😍

Happy Project !
