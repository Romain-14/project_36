import pool from "../config/db.js";

class Query {
    // méthode statique disponible uniquement sur la classe Query, pas besoin d'instancier la classe pour l'utiliser
    static async run(query) {
        // ici pas de paramètre dans la requête, donc méthode query
        const [result] = await pool.query(query);
        return result;
    }

    static async runWithParams(query, data) {        
        // ici on a des paramètres dans la requête, donc méthode execute afin de sécuriser les données
        // METHODE 1
        // const [result] = await pool.execute(query, data); 

        // METHODE 2 
        // Object.values(data) permets de transformer les valeurs des propriétés d'un objet afin de les placer dans un tableau
        const [result] = await pool.execute(query, Object.values(data));
        return result;
    }
}

export default Query;
