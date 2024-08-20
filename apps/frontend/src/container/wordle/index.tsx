'use client'
import { Button } from '@expense-management/frontend/components/ui/button';
import React, { useEffect, useState } from 'react'

type WordleProps = {}

const Wordle: React.FC<WordleProps> = () => {
  const [currentRow, setCurrentRow] = useState(1)
  const [keyDownValue, setKeyDownValue] = useState<string>('')
  const [rowValues] = useState(Array(5).fill(null))
  const [data, setData] = useState<any>({
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': []
  })
  const inputRegex = /^[a-zA-Z]+$/
  const handleInput = (input: string) => {
    setKeyDownValue(input)
  }
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (!e.altKey && !e.ctrlKey && !e.metaKey && inputRegex.test(e.key)) {
        handleInput(e.key)
      }
    })
    return () => {
      window.addEventListener('keydown', (e) => {
        if (!e.altKey && !e.ctrlKey && !e.metaKey && inputRegex.test(e.key)) {
          handleInput(e.key)
        }
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const updatedData = { ...data }

    if (keyDownValue.length === 1) {
      const cols = 5

      if (updatedData[currentRow].length < cols) {
        for (let j = 0; j < cols; j++) {
          if (!updatedData[currentRow][j]) {
            updatedData[currentRow][j] = keyDownValue.toUpperCase()
            setData(updatedData)
            setKeyDownValue('')
            return
          }
        }
      }
    }
    if (keyDownValue === 'Backspace') {
      updatedData[currentRow].pop()
      setData(updatedData)
      setKeyDownValue('')
      return
    }
  }, [currentRow, data, keyDownValue]) // eslint-disable-line react-hooks/exhaustive-deps
  const handleSubmit = () => {
    const result = 'think'.toUpperCase()
    for (let i = 0; i < data[currentRow].length; i++) {
      const spot = document.getElementById(`${currentRow}-${i}`)
      if (data[currentRow][i] === result[i]) {
        spot?.classList.add(...correctClass.split(' '))
      } else if (!result.includes(data[currentRow][i])) {
        spot?.classList.add(...notExitstClass.split(' '))
      } else {
        spot?.classList.add(...wrongSpotClass.split(' '))
      }
    }
    setCurrentRow(currentRow + 1)
  }
  const notExitstClass = 'bg-[#787c7e] text-white border-none'
  const wrongSpotClass = 'bg-[#c9b458] text-white border-none'
  const correctClass = 'bg-[#6aaa64] text-white border-none'
  return (
    <div className='flex justify-center flex-col items-center gap-3'>
      <Button type='button' onClick={handleSubmit}>
        {' '}
        Check
      </Button>
      {Object.values(data).map((item: any, index) => {
        return (
          <div className='flex gap-3' key={index}>
            {rowValues.map((value, colIndex) => {
              return (
                <div key={colIndex}>
                  <div
                    id={`${index + 1}-${colIndex}`}
                    className={` font-bold w-14 h-14 flex justify-center items-center border-2 border-[#d3d6da]`}
                  >
                    {item[colIndex]}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Wordle
