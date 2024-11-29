import { useLocalize } from '~/hooks';
import { BlinkAnimation } from './BlinkAnimation';
import { TStartupConfig } from 'librechat-data-provider';
import SocialLoginRender from './SocialLoginRender';
import { ThemeSelector } from '~/components/ui';
import { Banner } from '../Banners';
import Footer from './Footer';

const ErrorRender = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-16 flex justify-center">
    <div
      className="rounded-md border border-red-500 bg-red-500/10 px-3 py-2 text-sm text-gray-600 dark:text-gray-200"
      role="alert"
    >
      {children}
    </div>
  </div>
);

function AuthLayout({
  children,
  header,
  isFetching,
  startupConfig,
  startupConfigError,
  pathname,
  error,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  isFetching: boolean;
  startupConfig: TStartupConfig | null | undefined;
  startupConfigError: unknown | null | undefined;
  pathname: string;
  error: string | null;
}) {
  const localize = useLocalize();

  const DisplayError = () => {
    if (startupConfigError !== null && startupConfigError !== undefined) {
      return <ErrorRender>{localize('com_auth_error_login_server')}</ErrorRender>;
    } else if (error === 'com_auth_error_invalid_reset_token') {
      return (
        <ErrorRender>
          {localize('com_auth_error_invalid_reset_token')}{' '}
          <a className="font-semibold text-green-600 hover:underline" href="/forgot-password">
            {localize('com_auth_click_here')}
          </a>{' '}
          {localize('com_auth_to_try_again')}
        </ErrorRender>
      );
    } else if (error) {
      return <ErrorRender>{localize(error)}</ErrorRender>;
    }
    return null;
  };

  return (
    <div className="w-full min-h-screen dark:bg-[#0b0b0e] px-5 pt-10 md:px-[80px] md:pt-[100px] pb-10 relative overflow-hidden">
      <Banner />
      <DisplayError />
      <div className="absolute bottom-0 left-0 md:m-4">
        <ThemeSelector />
      </div>

      <div className="flex flex-grow items-center relative">
        <div className="w-[1028px] h-[1028px] bg-[radial-gradient(50%_50%,_rgba(70,60,255,0.44)_0%,_rgba(70,60,255,0.00)_100%)] animate-pulse-slow absolute top-6 -left-[70px] -z-[1]"></div>
        <div className="w-full max-w-[400px] overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg">
          {!startupConfigError && !isFetching && !(pathname.includes('login') || pathname.includes('register')) && (
            <h1
              className="mb-4 text-center text-3xl font-semibold text-black dark:text-white"
              style={{ userSelect: 'none' }}
            >
              {header}
            </h1>
          )}
          {(pathname.includes('login') || pathname.includes('register')) && (
            <div>
              <h2 className="inline-block font-medium text-[30px] text-[#333] dark:text-[#f2f2f2]">Take me to&nbsp;</h2>
              <p className="inline-block font-bold text-black dark:text-white text-6xl">
                <span>Luna</span>
                <span className="italic">AI</span>
              </p>
            </div>
          )}
          <div className="flex flex-col items-center bg-white dark:bg-[#f2f2f2] rounded-[20px] px-7 py-9">
            {children}
            {(pathname.includes('login') || pathname.includes('register')) && (
              <SocialLoginRender startupConfig={startupConfig} />
            )}
          </div>
        </div>
      </div>
      <Footer startupConfig={startupConfig} />
    </div>
  );
}

export default AuthLayout;
