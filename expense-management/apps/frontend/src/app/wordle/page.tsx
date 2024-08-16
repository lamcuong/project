import Wordle from '@frontend/container/wordle'
import MainLayout from '@frontend/layouts'
import React from 'react'

type WordlePageProps = {}

const WordlePage: React.FC<WordlePageProps> = () => {
  return (
    <MainLayout>
      <Wordle />
    </MainLayout>
  )
}

export default WordlePage
