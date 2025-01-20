import { ExpenseService } from '@expense-management/backend/services/expense';
import { removeIfNotExist } from '@expense-management/backend/utils/lodash';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ExpenseController {
  @inject(ExpenseService)
  private expenseService!: ExpenseService;

  public create = async (req: Request, res: Response) => {
    try {
      const { type, category, transaction } = req.body;
      const { accountId } = req.params;
      const data = await this.expenseService.create({
        type,
        transaction,
        account: accountId,
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
      const { type, category, transaction, id } = req.body;
      const { accountId } = req.params;
      const data = await this.expenseService.update(
        id,
        accountId,
        removeIfNotExist({
          type,
          category,
          transaction,
          account: accountId,
        }),
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
      const { accountId } = req.params;
      const data = await this.expenseService.list(
        accountId,
        Number(limit),
        Number(page),
      );
      console.log(data);

      return res.success({ data });
    } catch (error) {
      console.log(error);
      return res.internal();
    }
  };
  public delete = async (req: Request, res: Response) => {
    try {
      const { accountId, expenseId } = req.params;
      const data = await this.expenseService.delete(accountId, expenseId);
      return res.success({ data });
    } catch (error) {
      return res.internal();
    }
  };
}
