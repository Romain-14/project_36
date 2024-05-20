export default (req, res, next) => {
    if(req.session.isAdmin){
        // si l'utilisateur est un admin, on peut continuer à la prochaine étape de la requête (le controller)
        next();
    } else {
        // 403 : Forbidden
        res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action"});
    }
}