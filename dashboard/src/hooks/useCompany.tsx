import { useContext } from 'react';
import { companyContext } from '../providers/company-provider';

export const useCompany = () => useContext(companyContext);
