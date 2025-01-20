import { Button } from '@expense-management/frontend/components/ui/button/button';
import { Separator } from '@expense-management/frontend/components/ui/separator';
import AccountDetail from '@expense-management/frontend/features/accounts/components/account-detail';
import CreateExpense from '@expense-management/frontend/features/expenses/components/create-expense';
import ExpenseList from '@expense-management/frontend/features/expenses/components/expense-list';
import { PlusIcon } from 'lucide-react';

type DetailProps = {};

const Detail: React.FC<DetailProps> = () => {
  return (
    <div className="bg-white overflow-y-auto h-sidebar py-5 w-full">
      <div className="min-h-full h-auto max-w-[85%] mx-auto ">
        <AccountDetail />
        <Separator className="bg-neutral-300 my-3" />
        <div className="flex justify-between mb-3 items-center">
          <CreateExpense
            triggerButton={
              <Button className="w-1/5 flex items-center justify-center gap-3">
                <PlusIcon />{' '}
                <p className="hidden lg:block">Tạo g1iao dịch mới</p>{' '}
              </Button>
            }
          />
        </div>
        <ExpenseList />
      </div>
    </div>
  );
};

export default Detail;
