import { ExpenseService } from '@/services/expense';
import { removeIfNotExist } from '@/utils/lodash';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ExpenseController {
  @inject(ExpenseService)
  private expenseService!: ExpenseService;

  public create = async (req: Request, res: Response) => {
    try {
      const { type, category, transaction, account_id } = req.body;
      const data = await this.expenseService.create({
        type,
        transaction,
        account: account_id,
        category,
      });
      return res.success({ data });
    } catch (error) {
      console.log(error);
      return res.internal();
    }
  };
  public update = async (req: Request, res: Response) => {
    try {
      const { type, category, transaction, account_id, expense_id } = req.body;
      const data = await this.expenseService.update(
        expense_id,
        account_id,
        removeIfNotExist({
          type,
          category,
          transaction,
        })
      );
      return res.success({ data });
    } catch (error) {
      console.log(error);
      return res.internal();
    }
  };
  public list = async (req: Request, res: Response) => {
    try {
      const { limit = 10, page = 1 } = req.query;
      const { account_id } = req.params;
      const data = await this.expenseService.list(account_id, Number(limit), Number(page));
      console.log(data);

      return res.success({ data });
    } catch (error) {
      console.log(error);
      return res.internal();
    }
  };
  // public monthDetail = async (req: Request, res: Response) => {
  //   try {
  //     const { account_id } = req.params;
  //     const { limit = 10, page = 1, type = 'month', month = 11 } = req.query;
  //     const data = await this.expenseService.monthDetail(
  //       account_id,
  //       type as string,
  //       Number(limit),
  //       Number(page),
  //       Number(month)
  //     );
  //     return res.success({ data });
  //   } catch (error) {
  //     console.log(error);
  //     return res.internal();
  //   }
  // };
  public delete = async (req: Request, res: Response) => {
    try {
      const { expense_id } = req.body;
      const { account_id } = req.params;
      const data = await this.expenseService.delete(account_id, expense_id);
      return res.success({ data });
    } catch (error) {
      return res.internal();
    }
  };
}
