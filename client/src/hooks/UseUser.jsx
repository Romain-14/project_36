import { useContext } from 'react';
import { Context } from '../store/user/Context';

export const useUser = () => useContext(Context);