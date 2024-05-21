export default (req, res, next) => {
    if (!req.session.user ) {
            // 403 : Forbidden
            res.status(403).json({message: "Vous devez être connecté pour effectuer cette action !"});
            return;
    }
    if(req.session.user){
        next();
    } 
}