import { toast } from '@expense-management/frontend/components/ui/use-toast';
import { useDeleteExpense } from '../api/delete-expense';
import { ConfirmationDialog } from '@expense-management/frontend/components/ui/dialog/confirmation-dialog/confirmation-dialog';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import { Expense } from '@expense-management/shared';

type DeleteExpenseProps = {
  accountId: string;
  expense: Expense;
  triggerButton: React.ReactElement;
};

const DeleteExpense = ({
  accountId,
  expense,
  triggerButton,
}: DeleteExpenseProps) => {
  const deleteExpenseMutation = useDeleteExpense({
    accountId,
    mutationConfig: {
      onSuccess: () => {
        toast({ title: 'Xoá thành công' });
      },
    },
  });
  return (
    <ConfirmationDialog
      confirmButton={
        <Button
          disabled={deleteExpenseMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() =>
            deleteExpenseMutation.mutate({ accountId, expenseId: expense.id })
          }
        >
          Xác nhận
        </Button>
      }
      title={`Chắc chắn muốn xoá khoản ${expense.transaction.description} ?`}
      body={`Hành động này sẽ xoá khoản ${expense.transaction.description} hoàn toàn khỏi hệ thống và không thể hoàn tác`}
      triggerButton={triggerButton}
    />
  );
};

export default DeleteExpense;
