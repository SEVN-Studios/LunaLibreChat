import { useRecoilState } from 'recoil';
import * as Select from '@ariakit/react/select';
import React, { Fragment, useState, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetUserBalance, useGetStartupConfig } from 'librechat-data-provider/react-query';
import { LinkIcon, GearIcon, SettingsIcon, DropdownMenuSeparator } from '~/components';
import FilesView from '~/components/Chat/Input/Files/FilesView';
import { useAuthContext } from '~/hooks/AuthContext';
import useAvatar from '~/hooks/Messages/useAvatar';
import { UserIcon } from '~/components/svg';
import { useLocalize } from '~/hooks';
import Settings from './Settings';
import store from '~/store';
import { cn } from '~/utils';

function MenuItem({
  className,
  children,
  href,
  onClick,
}: {
  className: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  return (
    <li className="list-none">
      {onClick ? (
        <a
          className={cn([
            'block w-full font-medium hover:bg-[#eee] dark:hover:bg-[#25272e] text-[#2e2f38] dark:text-[#f2f2f2] text-sm rounded-full px-7 py-2.5 transition-colors duration-200',
            className,
          ])}
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          href="/"
        >
          {children}
        </a>
      ): (
        <Link
          className={cn([
            'block w-full font-medium hover:bg-[#eee] dark:hover:bg-[#25272e] text-[#2e2f38] dark:text-[#f2f2f2] text-sm rounded-full px-7 py-2.5 transition-colors duration-200',
            className,
          ])}
          to={href ?? '#'}
        >
          {children}
        </Link>
      )}
    </li>
  );
}

function AccountSettings() {
  const localize = useLocalize();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && startupConfig?.checkBalance,
  });
  const [openSettingsPanel, setOpenSettingsPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [previousPath, setPreviousPath] = useState('');
  const [showFiles, setShowFiles] = useRecoilState(store.showFiles);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const avatarSrc = useAvatar(user);
  const name = user?.avatar ?? user?.username ?? '';

  const settingsLinkMap: {title: string; href?: string; onClick?: () => void;}[] = [
    { title: 'General', onClick: () => setShowSettings(true) },
    { title: 'My Files', onClick: () => setShowFiles(true) },
    // { title: 'About Luna', href: '/settings/about' },
  ];

  return (
    <>
      <AnimatePresence>
        {openSettingsPanel && (
          <motion.div
            className="flex flex-col w-full h-[calc(100%-124px-0.875rem)] bg-white dark:bg-[#1a1b20] px-3 absolute top-[60px] left-0 z-50"
            initial={{ opacity: 0, translateX: '-100%' }}
            animate={{ opacity: 1, translateX: '0%' }}
            exit={{ opacity: 0, translateX: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          >
            <button
              className="bg-gray-100 dark:bg-[#292a32] hover:bg-white dark:hover:bg-[#2e2f38] text-black dark:text-white border-2 border-[#463cff] rounded-full px-4 py-3 mb-[46px] active:scale-95 transition-all ease-out duration-200 cursor-pointer"
              onClick={() => {
                setOpenSettingsPanel(false);

                if (pathname !== previousPath) {
                  navigate(previousPath);
                }
              }}
            >
              &lt; back to chats
            </button>
            <p className="font-medium text-[#2e2f38] dark:text-[#f2f2f2] text-lg mb-4">Settings</p>
            <div className="flex flex-col flex-grow space-y-2 overflow-x-hidden overflow-y-auto">
              {settingsLinkMap.map((link, i) => (
                <MenuItem
                  className={pathname == link.href ? 'bg-[#eee] dark:bg-[#25272e]': ''}
                  href={link.href}
                  onClick={link.onClick}
                  key={i}
                >
                  {link.title}
                </MenuItem>
              ))}
              <hr className="w-full h-px border-t-[#333]" />
              {/* <MenuItem
                className={pathname == '/settings/updates' ? 'bg-[#eee] dark:bg-[#25272e]': ''}
                href="/settings/updates"
              >
                Updates
              </MenuItem> */}
              <li className="list-none">
                <div
                  tabIndex={0}
                  role="button"
                  className={[
                    'w-full font-medium hover:bg-[#eee] dark:hover:bg-[#25272e] text-[#2e2f38] dark:text-[#f2f2f2] text-sm rounded-full px-7 py-2.5 transition-colors duration-200 cursor-pointer',
                  ].join(' ')}
                  onClick={() => logout()}
                  onKeyDown={() => void 0}
                >
                  Log out
                </div>
              </li>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Select.SelectProvider>
        <div className="mt-text-sm flex justify-between h-auto w-full items-center gap-2 bg-[#f2f2f2] dark:bg-[#292a32] border border-[#e0e0e0] dark:border-[#585c6e] rounded-full p-2 text-sm transition-all duration-200 ease-in-out hover:bg-accent">
          <div className="flex items-center gap-2">
            <div className="-ml-0.9 -mt-0.8 h-8 w-8 flex-shrink-0">
              <div className="relative flex">
                {name.length === 0 ? (
                  <div
                    style={{
                      backgroundColor: 'rgb(121, 137, 255)',
                      width: '32px',
                      height: '32px',
                      boxShadow: 'rgba(240, 246, 252, 0.1) 0px 0px 0px 1px',
                    }}
                    className="relative flex items-center justify-center rounded-full p-1 text-text-primary"
                    aria-hidden="true"
                  >
                    <UserIcon />
                  </div>
                ) : (
                  <img
                    className="rounded-full"
                    src={(user?.avatar ?? '') || avatarSrc}
                    alt={`${name}'s avatar`}
                  />
                )}
              </div>
            </div>
            <div
              className="mt-2 grow overflow-hidden text-ellipsis whitespace-nowrap text-left text-text-primary font-[500] text-base select-none"
              style={{ marginTop: '0', marginLeft: '0' }}
            >
              {user?.name ?? user?.username ?? localize('com_nav_user')}
            </div>
          </div>
          <Select.Select
            aria-label={localize('com_nav_account_settings')}
            data-testid="nav-user"
            onClick={() => {
              setPreviousPath(pathname);
              setOpenSettingsPanel(true);
            }}
          >
            <SettingsIcon className="stroke-[#828282] hover:stroke-[#ccc]" />
          </Select.Select>
        </div>
        {showFiles && <FilesView open={showFiles} onOpenChange={setShowFiles} />}
        {showSettings && <Settings open={showSettings} onOpenChange={setShowSettings} />}
      </Select.SelectProvider>
    </>
  );
}

export default memo(AccountSettings);
