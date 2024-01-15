export const accountKeys = {
  all: ['account', 'list'],
  list: (params: any) => [...accountKeys.all, { params }],
  detail: (id: string) => ['account', id]
}
export const expenseKeys = {
  all: ['expense', 'list'],
  list: (params: any) => [...expenseKeys.all, { params }],
  detail: (id: string) => ['expense', id]
}
