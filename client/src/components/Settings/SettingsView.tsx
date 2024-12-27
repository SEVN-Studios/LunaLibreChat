import { Outlet } from 'react-router-dom';
import useAuthRedirect from '~/routes/useAuthRedirect';

export default function SettingsView() {
  const { isAuthenticated } = useAuthRedirect();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="px-2 md:pl-9 md:pr-5 pt-5 md:pt-10">
      <div className="flex h-screen w-full flex-col">
        <Outlet />
      </div>
    </div>
  );
}
