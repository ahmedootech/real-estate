import { useContext } from 'react';
import { authContext } from '../providers/auth-provider';

export const useAuth = () => useContext(authContext);
