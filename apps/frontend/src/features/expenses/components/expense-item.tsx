'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@expense-management/frontend/components/ui/collapsible';
import { useDisclosure } from '@expense-management/frontend/hooks/use-disclosure';
import { cn } from '@expense-management/frontend/lib/utils';
import { ExpenseInterface } from '@expense-management/frontend/types/expense';
import {
  formatMoney,
  handleFormatNumber,
} from '@expense-management/frontend/utils/format';
import {
  Expense,
  ExpenseType,
  FORMAT_VIETNAMESE_DATE,
} from '@expense-management/shared';
import { Dictionary } from 'lodash';
import { ChevronDown, Pencil, Trash } from 'lucide-react';
import moment from 'moment';
import { calculateDailyExpense } from '../utils';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import { Separator } from '@expense-management/frontend/components/ui/separator';
import UpdateExpense from './update-expense';
import DeleteExpense from './delete-expense';
import { useParams } from 'next/navigation';

type ExpenseItemProps = {
  date: string;
  groupedByDate: Dictionary<Expense[]>;
  groupedList: { [key: string]: Dictionary<Expense[]> };
  index: number;
};

const ExpenseItem = ({
  date,
  index,
  groupedByDate,
  groupedList,
}: ExpenseItemProps) => {
  const { isOpen, toggle } = useDisclosure(index === 0);
  const totalExpenseForDay = calculateDailyExpense(groupedByDate[date]);
  const { id } = useParams();
  return (
    <Collapsible open={isOpen} onOpenChange={toggle} className="">
      <div className=" flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <div
            role="presentation"
            className=" bg-slate-200 w-full cursor-pointer p-2 flex justify-between items-center gap-2"
          >
            <h4 className=" hidden md:block font-[500] text-md flex-1">
              {date}
            </h4>
            <h4 className=" block md:hidden font-[500] text-md flex-1">
              {moment(date, FORMAT_VIETNAMESE_DATE).format('DD/MM/YYYY')}
            </h4>
            <div className="flex items-center gap-5 flex-1 justify-end whitespace-nowrap">
              <p
                className={cn('text-green-500 font-[500] text-md text-right ', {
                  'text-red-400': totalExpenseForDay < 0,
                })}
              >
                <span>{formatMoney(totalExpenseForDay)} VND</span>
              </p>
              <ChevronDown
                className={cn('transition-all duration-300  ', {
                  'rotate-180 ': isOpen,
                })}
              />
            </div>
          </div>
        </CollapsibleTrigger>
      </div>
      <Separator className="bg-neutral-200 w-full" />
      <CollapsibleContent className=" bg-neutral-100 space-y-1 CollapsibleContent">
        <div className=" my-3 break-words">
          {Object.keys(groupedList[date]).map((category, index, array) => {
            const categoryAmount = groupedList[date][category].reduce(
              (initialValue: number, item: ExpenseInterface) => {
                const amount =
                  item.type === ExpenseType.Income
                    ? item.transaction?.amount
                    : -item.transaction?.amount;
                return initialValue + Number(amount);
              },
              0,
            );
            return (
              <div key={index}>
                <div className="md:max-w-[90%] bg-neutral-200 p-2 font-[400] text-md flex justify-between items-center ">
                  <div className="flex gap-2">
                    <p>•</p>
                    <p>{category}</p>
                  </div>
                  <p
                    className={cn('px-0 text-green-500 font-[400] text-md', {
                      'text-red-400': categoryAmount < 0,
                    })}
                  >
                    <span>{formatMoney(categoryAmount)} VND</span>
                  </p>
                </div>

                {groupedList[date][category].map(
                  (item, index: number, array: any) => {
                    const amount =
                      item.type === ExpenseType.Income
                        ? item.transaction?.amount
                        : -item?.transaction?.amount;
                    return (
                      <div className="pl-5 md:pr-2 my-2" key={item.id}>
                        <div className="flex items-center lg:items-baseline">
                          <div className="w-full md:max-w-[90%] flex overflow-hidden mr-2 md:mr-0">
                            <p className="hidden md:block font-[400] text-md flex-1 text-left overflow-hidden">
                              {item.transaction?.description}
                            </p>
                            <UpdateExpense
                              expense={item}
                              triggerButton={
                                <div className="md:hidden font-[400] text-md flex-1 text-left overflow-hidden underline text-nowrap text-ellipsis cursor-pointer">
                                  <p>{item.transaction?.description}</p>
                                </div>
                              }
                            />
                            <p
                              className={cn(
                                'text-green-500 font-[400] text-md text-right flex-1 md:min-w-[20%] text-sm md:text-base md:block hidden',
                                {
                                  'text-red-400': amount! < 0,
                                },
                              )}
                            >
                              <span> {handleFormatNumber(amount)} VND</span>
                            </p>
                            <UpdateExpense
                              triggerButton={
                                <p
                                  className={cn(
                                    'text-green-500 font-[400] text-md text-right flex-1 underline cursor-pointer md:min-w-[20%] text-sm md:text-base block md:hidden ',
                                    {
                                      'text-red-400': amount! < 0,
                                    },
                                  )}
                                >
                                  <span> {handleFormatNumber(amount)} VND</span>
                                </p>
                              }
                              expense={item}
                            />
                          </div>
                          <div className="md:flex flex-1 justify-center gap-1 md:gap-3 hidden ">
                            <UpdateExpense
                              expense={item}
                              triggerButton={
                                <Button type="button" variant="default">
                                  <Pencil size={14} />
                                </Button>
                              }
                            />
                            <DeleteExpense
                              triggerButton={
                                <Button variant="destructive">
                                  <Trash size={14} />
                                </Button>
                              }
                              accountId={id as string}
                              expense={item}
                            />
                          </div>
                        </div>
                        {index !== array.length - 1 && (
                          <Separator className="my-2 bg-slate-500 flex-1" />
                        )}
                      </div>
                    );
                  },
                )}
                {index !== array.length - 1 && (
                  <Separator className="my-2 bg-slate-500" />
                )}
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ExpenseItem;
