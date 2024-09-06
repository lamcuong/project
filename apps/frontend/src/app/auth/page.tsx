import AuthPage from '@expense-management/frontend/container/auth';
import React from 'react';

type AuthProps = {};

const Auth: React.FC<AuthProps> = async () => {
  console.log('1231232312312', process.env.NEXT_PUBLIC_BASE_URL);
  return (
    <div className="bg-muted min-h-screen py-24">
      <AuthPage />
    </div>
  );
};

export default Auth;
