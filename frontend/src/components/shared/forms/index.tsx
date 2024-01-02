import * as z from 'zod'

export const signUpForm = z
  .object({
    username: z
      .string({
        required_error: 'Tên đăng nhập không được để trống'
      })
      .min(1, 'Tên đăng nhập không được để trống')
      .regex(/^[^\s]*$/, 'Tên đăng nhập không được chứa khoảng trắng'),
    password: z
      .string({
        required_error: 'Mật khẩu không được để trống'
      })
      .min(1, 'Mật khẩu không được để trống')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=\S+$)/, 'Mật khẩu bao gồm chữ hoa, chữ thường và số')
      .min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
    confirm_password: z
      .string({
        required_error: 'Xác nhận mật khẩu không được để trống'
      })
      .min(1, 'Xác nhận mật khẩu không được để trống')
      .trim()
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Mật khẩu không khớp'
  })

export const signInForm = z.object({
  username: z
    .string({
      required_error: 'Tên đăng nhập không được để trống'
    })
    .regex(/^[^\s]*$/, 'Tên đăng nhập không được chứa khoảng trắng'),
  password: z
    .string({
      required_error: 'Mật khẩu không được để trống'
    })

    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=\S+$)/, 'Mật khẩu bao gồm chữ hoa, chữ thường và số')
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự')
})
export const accountForm = z.object({
  name: z
    .string({
      required_error: 'Tên tài khoản không được để trống'
    })
    .min(1, 'Tên tài khoản không được để trống'),
  initialBalance: z
    .string({
      invalid_type_error: 'Số dư ban đầu chỉ được nhập số'
    })
    .min(1, 'Số dư ban đầu không được để trống')
    .regex(/^[^\D]+$/, 'Số dư ban đầu chỉ được nhập số')
})
export const expenseForm = z.object({
  type: z.string().default('outcome'),
  transaction: z.object({
    description: z.string().min(1, 'Ghi chú không được để trống'),
    date: z.date().default(new Date()),
    amount: z
      .string()
      .min(1, 'Số tiền không được để trống')
      .regex(/^[^\D]+$/, 'Số dư ban đầu chỉ được nhập số')
  }),
  category: z.string().min(1, 'Hạng mục không được để trống')
})
