import { useDisclosure } from '@expense-management/frontend/hooks/use-disclosure';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog/dialog';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Button } from '../button/button';

type FormDialogProps = {
  isDone: boolean;
  triggerButton: ReactElement;
  submitButton: ReactElement;
  title: string | ReactElement;
  children: ReactNode;
};

const FormDialog = ({
  isDone,
  triggerButton,
  submitButton,
  title,
  children,
}: FormDialogProps) => {
  const { isOpen, close, toggle } = useDisclosure();
  useEffect(() => {
    if (isDone) {
      close();
    }
  }, [close, isDone]);
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90%]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button
            className="rounded-radius"
            variant="secondary"
            type="button"
            onClick={close}
          >
            Quay lại
          </Button>
          {submitButton}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
