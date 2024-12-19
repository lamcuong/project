import React from 'react';

import CreateAccount from '@expense-management/frontend/features/accounts/components/create-account';
import EmptyIcon from '../assets/empty-icon';

type EmptyStateProps = {
  create: any;
};

const EmptyState: React.FC<EmptyStateProps> = ({ create }) => {
  return (
    <div className="flex flex-col items-center gap-3 ">
      <div className="w-full h-auto lg:w-[70%]">
        <EmptyIcon className="w-1/4 h-auto mx-auto " />
      </div>
      <div className="text-center">
        <p className="text-lg lg:text-xl mb-4">Chưa có tài khoản chi tiêu</p>
        <p className="text-sm lg:text-lg">
          Tạo ngay tài khoản để quản lý chi tiêu cho bản thân và gia đình tại
          đây
        </p>
      </div>
      <div className="w-1/2 lg:w-1/4 mt-4">
        <CreateAccount triggerText="Tạo ngay" />
      </div>
    </div>
  );
};

export default EmptyState;
