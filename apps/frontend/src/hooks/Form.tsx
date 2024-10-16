'use client'
import { Button } from '@expense-management/frontend/components/ui/button/button';
import { Calendar } from '@expense-management/frontend/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@expense-management/frontend/components/ui/dialog/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from '@expense-management/frontend/components/ui/form';
import { Input } from '@expense-management/frontend/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@expense-management/frontend/components/ui/popover';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@expense-management/frontend/components/ui/select';
import { formatVietnameseDate } from '@expense-management/frontend/utils/format';
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

type UseFormDialogProps = {
  form: UseFormReturn<any>
  fields: Field[]
  title: string
  description?: string

  loading?: boolean
  createItem?: (item?: any) => Promise<any>
  updateItem?: (item?: any) => void
}

export const useFormDialog = (props: UseFormDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openPopover, setOpenPopover] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const { form, fields, title, description, createItem, updateItem } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const setValue = (value: any) => {
    form.reset(value, { keepDefaultValues: true })
  }
  const create = (defaultValue?: any) => {
    setValue(defaultValue)
    setIsUpdate(false)
    setIsOpen(true)
  }
  const update = (item: any) => {
    setValue(item)
    setIsUpdate(true)
    setIsOpen(true)
  }
  const onSubmit = () => {
    setIsLoading(true)
    let mutateAsync
    if (isUpdate) {
      mutateAsync = updateItem?.(form.getValues())
    } else {
      mutateAsync = createItem?.(form.getValues())
    }
    if (mutateAsync) {
      mutateAsync
        .then(() => {
          setIsOpen(false)
          form.reset()
        })
        .catch(() => {})
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  const render = () => {
    const dynamicFields = fields.map((item, index) => {
      const getDynamicField = (props: any) => {
        const { value, onChange, name } = props
        switch (item.type) {
          case 'number':
            {
              const numberValue = item.inputTextProps?.useGrouping
                ? Number(value).toLocaleString().replace(/,/g, '.')
                : Number(value);
              return (
                <Input
                  value={numberValue == 0 ? '' : numberValue}
                  onChange={(e) => {
                    const parsedValue = e.target.value.replace(/\./g, '');
                    if (!isNaN(Number(parsedValue))) {
                      onChange(e.target.value.replaceAll('.', ''));
                    }
                  }}
                  type="text"
                />
              );
            }
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
        open={isOpen}
        onOpenChange={() => {
          form.reset()
          setIsOpen(false)
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
                <Button disabled={isLoading} className='rounded-radius' type='submit'>
                  Lưu thông tin
                </Button>
                <Button
                  className='rounded-radius'
                  variant='secondary'
                  type='button'
                  onClick={() => {
                    setIsOpen(false)
                    form.reset()
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
  return { render, setValue, create, update }
}
