import FormDialog from '@expense-management/frontend/components/ui/form/form-dialog';
import {
  createAccountInputSchema,
  useCreateAccount,
} from '../api/create-account';
import { Separator } from '@expense-management/frontend/components/ui/separator';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import {
  Form,
  InputForm,
} from '@expense-management/frontend/components/ui/form';
import { formatMoney } from '@expense-management/frontend/utils/format';
import { useToast } from '@expense-management/frontend/components/ui/use-toast';

type CreateAccountProps = {
  triggerText?: string;
};

const CreateAccount = ({
  triggerText = 'Thêm tài khoản',
}: CreateAccountProps) => {
  const { toast } = useToast();
  const createAccountMutation = useCreateAccount({
    mutationConfig: {
      onSuccess: (account) => {
        toast({
          title: 'Thêm mới tài khoản thành công',
          description: (
            <div>
              <Separator className="bg-neutral-200 my-3 w-full" />
              <p>Tên tài khoản: {account.data.name}</p>
              <p className="mt-2">
                Số dư ban đầu: {formatMoney(account.data.initialBalance)} VND
              </p>
            </div>
          ),
        });
      },
    },
  });
  return (
    <FormDialog
      title="Tạo tài khoản chi tiêu"
      triggerButton={<Button className="w-full">{triggerText}</Button>}
      isDone={createAccountMutation.isSuccess}
      submitButton={
        <Button
          type="submit"
          form="create-account"
          disabled={createAccountMutation.isPending}
        >
          Lưu thông tin
        </Button>
      }
    >
      <Form
        schema={createAccountInputSchema}
        onSubmit={(values) => {
          createAccountMutation.mutate({
            data: values,
          });
        }}
        options={{
          defaultValues: {
            initialBalance: 0,
            name: '',
          },
        }}
        id="create-account"
      >
        {({ formState, control }) => {
          return (
            <>
              <InputForm
                label="Tài khoản chi tiêu"
                control={control}
                name="name"
                error={formState.errors['name']}
              />
              <InputForm
                label="Số dư ban đầu"
                error={formState.errors['initialBalance']}
                control={control}
                name="initialBalance"
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

export default CreateAccount;
