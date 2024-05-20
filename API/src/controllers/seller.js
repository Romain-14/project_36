import Query from "../model/Query.js";

const getAll = async (req, res) => {
	res.json({
		msg: "Je suis sur la route API pour récupérer TOUS les 'seller' !",
	});
}

const add =   async (req, res) => {
    
    const { label, location} = req.body;

    try {
        const response = await Query.execute(
            "INSERT INTO seller (label, location) VALUES (?, ?)",
            [label, location ]
        );
        
        res.json({ msg: `Vendeur '${label}' bien ajouté sur l'id ${response.insertId}` });
        
    } catch (error) {
        console.log(error);
    }

}


export { getAll, add };