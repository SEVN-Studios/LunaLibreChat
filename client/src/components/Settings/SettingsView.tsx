import { Outlet } from 'react-router-dom';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import { useAppStartup } from '~/hooks';
import useAuthRedirect from '~/routes/useAuthRedirect';
import { useHealthCheck } from '~/data-provider';

export default function SettingsView() {
  useHealthCheck();
  const { data: startupConfig } = useGetStartupConfig();
  const { isAuthenticated, user } = useAuthRedirect();
  useAppStartup({ startupConfig, user });

  if (!isAuthenticated) {
    console.log('AUTHENTICATED REDIRECT:', isAuthenticated);
    return null;
  }

  return (
    <div className="flex h-screen w-full flex-col bg-[#f9f9f9] p-0 dark:bg-transparent lg:p-2">
      <Outlet />
    </div>
  );
}
