import Query from "../model/Query.js";

const getAll = async (req, res) => {
    try {
        const query = `
            SELECT label
            FROM category
        `;
        const response = await Query.run(query);
        
        res.json(response);

    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }
}

const add =  async (req, res) => {
    const { label } = req.body;

    try {
        const response = await Query.runWithParams(
            "INSERT INTO category (label) VALUES (?)",
            [label]
        );
        
        res.json({ msg: `Catégorie '${label}' bien ajouté sur l'id ${response.insertId}` });
        
    } catch (error) {
        res.status(500).json({ msg: "Erreur de serveur", error: error.message });
    }

}


export { getAll, add };