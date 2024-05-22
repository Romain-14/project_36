import { useContext } from 'react';
import { Context } from '../store/cart/Context';

// dans ce hook, on récupère le context User et on le retourne
export const useCart = () => useContext(Context);