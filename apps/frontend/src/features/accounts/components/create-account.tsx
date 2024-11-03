import FormDialog from '@expense-management/frontend/components/ui/form/form-dialog';
import {
  createAccountInputSchema,
  useCreateAccount,
} from '../api/create-account';
import { Separator } from '@expense-management/frontend/components/ui/separator';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import { Form, Input } from '@expense-management/frontend/components/ui/form';
import { formatNumber } from '@expense-management/frontend/utils/format';
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
                Số dư ban đầu: {formatNumber(`${account.data.initialBalance}`)}{' '}
                VND
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
        id="create-account"
      >
        {({ register, formState, watch }) => {
          return (
            <>
              <Input
                label="Tài khoản chi tiêu"
                registration={register('name')}
                error={formState.errors['name']}
              />
              <Input
                label="Số dư ban đầu"
                registration={register('initialBalance', {
                  // set value back to number
                  setValueAs: (value) => {
                    const newValue = Number(
                      value.toString().replace(/\./g, ''),
                    );
                    return isNaN(newValue) ? value : newValue;
                  },
                })}
                error={formState.errors['initialBalance']}
                value={formatNumber(watch('initialBalance')?.toString() || '')}
              />
            </>
          );
        }}
      </Form>
    </FormDialog>
  );
};

export default CreateAccount;
