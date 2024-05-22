import { useContext, useEffect } from 'react';
import { Context } from '../store/menu/Context';

// dans ce hook, on récupère le context Menu et on le retourne
// on a besoin de l'état isMenuOpen et de la fonction toggleMenu
// qu'on rendra disponible dans les composants qui auront besoin de cette fonctionnalité
// ce hook permets de lors de son utilisation de fermer le menu si il est ouvert et/ou de bénéficier de l'état du menu et de la fonction pour le fermer
function UseMenu() {
    const {isMenuOpen, toggleMenu} = useContext(Context);

    useEffect(()=>{
        if(isMenuOpen) toggleMenu();
    }, []);

    return  {isMenuOpen, toggleMenu }    
}

export default UseMenu;