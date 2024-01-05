'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormMessage, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { formatVietnameseDate } from '@/utils/format'
import { CalendarDays } from 'lucide-react'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

type UseFormDialogProps = {
  form: UseFormReturn<any>
  fields: Field[]
  onSubmit: (input: any) => Promise<void>
  title: string
  description?: string
  open: boolean
  setOpen: any
}

export const useFormDialog = (props: UseFormDialogProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  const { form, fields, onSubmit, title, description, open, setOpen } = props

  const render = () => {
    const dynamicFields = fields.map((item, index) => {
      const getDynamicField = (props: any) => {
        const { value, onChange, name } = props
        switch (item.type) {
          case 'number':
            const numberValue = item.inputTextProps?.useGrouping
              ? Number(value).toLocaleString().replace(/,/g, '.')
              : Number(value)
            return (
              <Input
                value={numberValue == 0 ? '' : numberValue}
                onChange={(e) => {
                  const parsedValue = e.target.value.replace(/\./g, '')
                  if (!isNaN(Number(parsedValue))) {
                    onChange(e.target.value.replaceAll('.', ''))
                  }
                }}
                type='text'
              />
            )
          case 'select':
            return (
              <Select
                {...props}
                onValueChange={onChange}
                name={name}
                defaultValue={`${item.selectProps?.defaultValue}`}
              >
                <SelectTrigger className=''>
                  <SelectValue placeholder='Chi tiền' />
                </SelectTrigger>
                <SelectContent className=''>
                  {item.selectProps?.options.map((option, index) => {
                    return (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            )
          case 'date':
            return (
              <Popover modal={true} onOpenChange={setOpenPopover} open={openPopover}>
                <PopoverTrigger asChild className='w-full'>
                  <Button variant='secondary' className='w-full rounded-md !flex items-center'>
                    <CalendarDays className='left-2 h-5 w-5' />
                    <p className='text-center '>
                      {value ? formatVietnameseDate(value) : formatVietnameseDate(new Date())}
                    </p>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    onDayClick={() => {
                      setOpenPopover(false)
                    }}
                    mode='single'
                    selected={value}
                    onSelect={onChange}
                  />
                </PopoverContent>
              </Popover>
            )
          default:
            return <Input {...props} {...item.inputTextProps} />
        }
      }

      return (
        <FormField
          key={index}
          control={form.control}
          name={item.name}
          render={({ field }) => (
            <FormItem className='mt-5'>
              <FormLabel>{item.label}</FormLabel>
              <FormControl>{getDynamicField({ ...field })}</FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        />
      )
    })

    return (
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false)
          form.reset({})
        }}
      >
        <DialogContent className='max-h-[90%]'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {dynamicFields}
              <div className='pt-8 flex justify-end gap-2'>
                <Button className='rounded-radius' type='submit'>
                  Lưu thông tin
                </Button>
                <Button
                  className='rounded-radius bg-secondary text-secondary-foreground'
                  type='button'
                  onClick={() => {
                    setOpen(false)
                    form.reset({})
                  }}
                >
                  Quay lại
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  }
  return { render }
}
