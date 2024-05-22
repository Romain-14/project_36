import { useContext } from 'react';
import { Context } from '../store/user/Context';

// dans ce hook, on récupère le context User et on le retourne
export const useUser = () => useContext(Context);