export type ErrorProps = {
  errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
  return (
    <p className="text-xs font-medium text-red-500 mt-1 min-h-4">
      {errorMessage}
    </p>
  );
};
