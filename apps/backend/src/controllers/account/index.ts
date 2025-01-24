import { AccountService } from '@expense-management/backend/services/account';
import { removeIfNotExist } from '@expense-management/backend/utils/lodash';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class AccountController {
  @inject(AccountService)
  private accountService!: AccountService;

  public create = async (req: Request, res: Response) => {
    const { name, initialBalance } = req.body;
    try {
      const data = await this.accountService.create(
        removeIfNotExist({
          name,
          initialBalance,
          user: req.user.id,
          balance: initialBalance,
        }),
      );
      return res.success({ data });
    } catch (error) {
      return res.internal({ errors: error });
    }
  };
  public update = async (req: Request, res: Response) => {
    try {
      const { name, initialBalance } = req.body;
      const { accountId } = req.params;
      const data = await this.accountService.update(
        accountId,
        removeIfNotExist({
          name,
          initialBalance,
          user: req.user.id,
        }),
      );

      return res.success({ data });
    } catch (error) {
      return res.internal({ errors: error });
    }
  };
  public detail = async (req: Request, res: Response) => {
    try {
      const { accountId } = req.params;
      const data = await this.accountService.detail(accountId, req.user.id);
      return res.success({ data });
    } catch (error) {
      return res.internal();
    }
  };
  public delete = async (req: Request, res: Response) => {
    try {
      const { accountId } = req.params;
      const data = await this.accountService.delete(accountId, req.user.id);
      return res.success({ data });
    } catch (error) {
      return res.internal();
    }
  };
  public list = async (req: Request, res: Response) => {
    try {
      const { limit = 10, page = 1, search = '' } = req.query;
      const data = await this.accountService.list(
        req.user?.id,
        Number(limit),
        Number(page),
        search as string,
      );
      return res.success({ data });
    } catch (error) {
      console.log(error);
      return res.internal();
    }
  };
}
