'use client';
import { useParams } from 'next/navigation';
import {
  createExpenseInputSchema,
  useCreateExpense,
} from '../api/create-expense';
import { toast } from '@expense-management/frontend/components/ui/use-toast';
import { Separator } from '@expense-management/frontend/components/ui/separator';
import { ExpenseType } from '@expense-management/shared';
import {
  formatMoney,
  formatVietnameseDate,
  handleFormatNumber,
} from '@expense-management/frontend/utils/format';
import FormDialog from '@expense-management/frontend/components/ui/form/form-dialog';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import {
  Form,
  InputForm,
  SelectForm,
} from '@expense-management/frontend/components/ui/form';
import { expenseTypeOptions, incomeOptions, outcomeOptions } from '../utils';
import DatePickerForm from '@expense-management/frontend/components/ui/form/date-picker-form';

type CreateExpenseProps = {
  triggerButton: React.ReactElement;
};

const CreateExpense = ({ triggerButton }: CreateExpenseProps) => {
  const { id } = useParams();
  const createExpenseMutation = useCreateExpense({
    accountId: id as string,
    mutationConfig: {
      onSuccess: (expense) => {
        toast({
          title: 'Thêm giao dịch mới thành công',
          description: (
            <div>
              <Separator className="bg-neutral-200 my-3 w-full" />
              <p>Hạng mục: {expense.data.category}</p>
              <p className="mt-2">
                {expense.data.type === ExpenseType.Income
                  ? 'Thu tiền'
                  : 'Chi tiền'}
                : {handleFormatNumber(expense.data.transaction?.amount)} VND
              </p>
            </div>
          ),
        });
      },
    },
  });
  return (
    <FormDialog
      title="Tạo giao dịch"
      isDone={createExpenseMutation.isSuccess}
      submitButton={
        <Button
          form="create-expense"
          type="submit"
          disabled={createExpenseMutation.isPending}
        >
          Lưu thông tin
        </Button>
      }
      triggerButton={triggerButton}
    >
      <Form
        schema={createExpenseInputSchema}
        onSubmit={(values) =>
          createExpenseMutation.mutate({
            data: values,
            accountId: id as string,
          })
        }
        id="create-expense"
        options={{
          defaultValues: {
            category: outcomeOptions[0].value,
            type: ExpenseType.Outcome,
            transaction: {
              amount: 0,
              description: '',
              date: new Date(),
            },
          },
        }}
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

export default CreateExpense;
