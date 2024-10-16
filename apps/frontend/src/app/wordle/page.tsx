import Wordle from '@expense-management/frontend/container/wordle';
import MainLayout from '@expense-management/frontend/components/ui/layouts';
import React from 'react';

type WordlePageProps = {};

const WordlePage: React.FC<WordlePageProps> = () => {
  return (
    <MainLayout>
      <Wordle />
    </MainLayout>
  );
};

export default WordlePage;
