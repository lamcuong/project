import { cn } from '@frontend/lib/utils'
type SkeletonProps = {
  times: number
  className?: string
  outerClassName?: string
  gap?: any
}
function Skeleton({ className, times, outerClassName, gap }: SkeletonProps) {
  return (
    <div className={outerClassName || `flex flex-col justify-center gap-${gap}`}>
      {Array(times)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className={cn('animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-500 duration-1000', className)}
            />
          )
        })}
    </div>
  )
  // return <div className={cn('animate-pulse rounded-md bg-muted', className)} />;
}

export { Skeleton }
