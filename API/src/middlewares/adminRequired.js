export default (req, res, next) => {
    // si il n'y a pas d'utilisateur connecté ou si l'utilisateur n'est pas un admin, on renvoie une erreur 403 (action interdite)
    if (!req.session.user || !req.session.user.isAdmin) {
            // 403 : Forbidden
            res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action"});
            return;
    }
    if(req.session.user.isAdmin){
        // si l'utilisateur est un admin, on peut continuer à la prochaine étape de la requête (le controller)
        next();
    } 
}