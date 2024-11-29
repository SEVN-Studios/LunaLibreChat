import * as React from 'react';

import { cn } from '~/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        'flex h-10 w-full border border-input rounded-full bg-transparent px-4 py-2.5 text-sm ring-offset-background text-[#333] dark:text-[#f2f2f2] placeholder:text-[#666] dark:placeholder:text-[#828282] border-[#666] dark:border-[#f2f2f2] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className ?? '',
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
