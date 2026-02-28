import { useEffect, useState } from 'react';
import type { ContactInfo } from '../types';
import { getContactInfo } from './getContactInfo';

export const useContactInfo = () => {
  const [data, setData] = useState<ContactInfo | null>(null);

  useEffect(() => {
    getContactInfo().then(setData);
  }, []);

  return data;
};
