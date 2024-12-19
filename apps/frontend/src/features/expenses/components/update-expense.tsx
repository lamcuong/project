import FormDialog from '@expense-management/frontend/components/ui/form/form-dialog';
import {
  updateExpenseInputSchema,
  useUpdateExpense,
} from '../api/update-expense';
import { toast } from '@expense-management/frontend/components/ui/use-toast';
import { useParams } from 'next/navigation';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import { ReactElement } from 'react';
import {
  Form,
  InputForm,
  SelectForm,
} from '@expense-management/frontend/components/ui/form';
import { Expense, ExpenseType } from '@expense-management/shared';
import { expenseTypeOptions, incomeOptions, outcomeOptions } from '../utils';
import {
  formatMoney,
  formatVietnameseDate,
} from '@expense-management/frontend/utils/format';
import DatePickerForm from '@expense-management/frontend/components/ui/form/date-picker-form';
import DeleteExpense from './delete-expense';
import { Trash } from 'lucide-react';

type UpdateExpenseProps = {
  triggerButton: ReactElement;
  expense: Expense;
};

const UpdateExpense = ({ triggerButton, expense }: UpdateExpenseProps) => {
  const { id } = useParams();
  const updateExpenseMutation = useUpdateExpense({
    mutationConfig: {
      onSuccess: () => {
        toast({
          title: 'Cập nhật thành công',
        });
      },
    },
    accountId: id as string,
  });

  return (
    <FormDialog
      isDone={updateExpenseMutation.isSuccess}
      title={
        <div className="flex justify-between items-center">
          <span>Chỉnh sửa giao dịch</span>
          <DeleteExpense
            accountId={id as string}
            expense={expense}
            triggerButton={<Trash className="cursor-pointer" size={20} />}
          />
        </div>
      }
      submitButton={
        <Button
          form="update-expense"
          type="submit"
          disabled={updateExpenseMutation.isPending}
        >
          Lưu thông tin
        </Button>
      }
      triggerButton={triggerButton}
    >
      <Form
        schema={updateExpenseInputSchema}
        options={{
          defaultValues: {
            category: expense.category,
            transaction: {
              amount: expense.transaction.amount,
              description: expense.transaction.description,
              date: new Date(expense.transaction.date),
            },
            type: expense.type,
            id: expense.id,
          },
        }}
        onSubmit={(values) => {
          updateExpenseMutation.mutate({
            data: values,
            accountId: id as string,
          });
        }}
        id="update-expense"
      >
        {({ formState, watch, control, setValue }) => {
          const type = watch('type');
          const categoryOptions =
            type === ExpenseType.Income ? incomeOptions : outcomeOptions;
          if (
            !categoryOptions.some(
              (option) => option.value === watch('category'),
            )
          ) {
            setValue('category', categoryOptions[0].value, {
              shouldTouch: true,
            });
          }

          const dateValue = watch('transaction.date');
          return (
            <>
              <SelectForm
                options={expenseTypeOptions}
                label="Loại giao dịch"
                control={control}
                name="type"
                error={formState.errors['type']}
              />
              <SelectForm
                label="Hạng mục"
                options={categoryOptions}
                control={control}
                name="category"
                error={formState.errors['category']}
              />
              <DatePickerForm
                triggerButton={
                  <Button
                    variant="secondary"
                    className="w-full rounded-md !flex items-center"
                  >
                    <p className="text-center">
                      {dateValue
                        ? formatVietnameseDate(dateValue)
                        : formatVietnameseDate(new Date())}
                    </p>
                  </Button>
                }
                control={control}
                name="transaction.date"
                label="Thời gian"
                error={formState.errors.transaction?.date}
              />
              <InputForm
                name="transaction.description"
                label="Chi tiết"
                control={control}
              />
              <InputForm
                control={control}
                name="transaction.amount"
                label="Số tiền"
                error={formState.errors.transaction?.amount}
                format={(value) => formatMoney((value as number) || 0)}
                parse={(value) => {
                  const newValue = Number(value.toString().replace(/\./g, ''));
                  return isNaN(newValue) ? value : newValue;
                }}
              />
            </>
          );
        }}
      </Form>
    </FormDialog>
  );
};

export default UpdateExpense;
