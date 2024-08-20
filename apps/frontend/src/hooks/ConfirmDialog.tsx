import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@expense-management/frontend/components/ui/alert-dialog';
import { Button } from '@expense-management/frontend/components/ui/button';
import React, { ReactNode, useCallback, useContext, useState } from 'react';

type ConfirmDialogType = {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
};
const ConfirmationDialogContext = React.createContext(
  (info: ConfirmDialogType, handler: () => Promise<any>) => {},
);
export const useConfirmDialog = () => {
  return useContext(ConfirmationDialogContext);
};
export const ConfirmationDialogContextProvider = (props: any) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<ConfirmDialogType>({
    title: '',
    description: '',
    cancelText: 'Quay lại',
    confirmText: 'Xác nhận',
  });
  const [handler, setHandler] = useState(() => () => Promise.resolve(true));

  const showDialog = useCallback(
    (info: ConfirmDialogType, handler: () => Promise<boolean>) => {
      setInfo((prevState) => ({
        ...prevState,
        ...info,
      }));
      setHandler(() => handler);
      setIsOpen(true);
    },
    [],
  );
  const onSubmit: any = () => {
    setIsLoading(true);
    handler()
      .then(() => setIsOpen(false))
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <ConfirmationDialogContext.Provider value={showDialog}>
        {children}
      </ConfirmationDialogContext.Provider>
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{info.title}</AlertDialogTitle>
            <AlertDialogDescription>{info.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 w-1/2 mx-auto sm:w-full">
            <Button
              disabled={isLoading}
              variant="destructive"
              onClick={onSubmit}
            >
              {info.confirmText}
            </Button>
            <AlertDialogCancel type="button">
              {info.cancelText}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};