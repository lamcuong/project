import Wordle from '@/container/wordle'
import MainLayout from '@/layouts'
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
