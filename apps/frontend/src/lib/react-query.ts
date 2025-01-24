import { DefaultOptions, UseMutationOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

export type QueryConfig<T extends (...args: any) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type ApiReturnFn<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;
export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiReturnFn<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
