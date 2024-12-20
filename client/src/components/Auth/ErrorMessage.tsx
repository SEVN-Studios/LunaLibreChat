export const ErrorMessage = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`rounded-md border border-red-500 bg-red-500/10 px-3 py-2 text-sm ${className ?? 'text-gray-600 dark:text-gray-200'}`}
    role="alert"
  >
    {children}
  </div>
);
