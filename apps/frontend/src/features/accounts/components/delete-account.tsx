import { ConfirmationDialog } from '@expense-management/frontend/components/ui/dialog/confirmation-dialog/confirmation-dialog';
import { useDeleteAccount } from '../api/delete-account';
import { toast } from '@expense-management/frontend/components/ui/use-toast';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import { Account } from '@expense-management/shared';

type DeleteAccountProps = {
  account: Account;
};

const DeleteAccount = ({ account }: DeleteAccountProps) => {
  const deleteAccountMutation = useDeleteAccount({
    mutationConfig: {
      onSuccess: () => {
        toast({
          title: `Xoá thà1nh công tài khoản ${account.name}`,
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      confirmButton={
        <Button
          disabled={deleteAccountMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteAccountMutation.mutate(account.id)}
        >
          Xác nhận
        </Button>
      }
      title={`Chắc chắn muốn xoá tài khoản ${account.name} ?`}
      body={`Hành động này sẽ xoá tài khoản ${account.name} hoàn toàn khỏi hệ thống và không thể hoàn tác`}
      triggerButton={
        <Button className="flex-1 !px-0" variant="destructive">
          Xoá
        </Button>
      }
    />
  );
};

export default DeleteAccount;
