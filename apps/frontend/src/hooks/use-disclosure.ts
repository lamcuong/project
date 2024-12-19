import { useCallback, useState } from 'react';

export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initial);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((state) => !state), []);
  return { open, close, toggle, isOpen };
};
