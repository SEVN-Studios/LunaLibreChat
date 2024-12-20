import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { useGetStartupConfig } from 'librechat-data-provider/react-query';
import type { TLoginUser, TStartupConfig } from 'librechat-data-provider';
import type { TAuthContext } from '~/common';
import { useResendVerificationEmail } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { Spinner } from '../svg';

type TLoginFormProps = {
  onSubmit: (data: TLoginUser) => void;
  startupConfig: TStartupConfig;
  error: Pick<TAuthContext, 'error'>['error'];
  setError: Pick<TAuthContext, 'setError'>['setError'];
};

const LoginForm: React.FC<TLoginFormProps> = ({ onSubmit, startupConfig, error, setError }) => {
  const localize = useLocalize();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUser>();
  const [showResendLink, setShowResendLink] = useState<boolean>(false);

  const { data: config } = useGetStartupConfig();
  const useUsernameLogin = config?.ldap?.username;

  useEffect(() => {
    if (error && error.includes('422') && !showResendLink) {
      setShowResendLink(true);
    }
  }, [error, showResendLink]);

  const resendLinkMutation = useResendVerificationEmail({
    onMutate: () => {
      setError(undefined);
      setShowResendLink(false);
    },
  });

  if (!startupConfig) {
    return null;
  }

  const renderError = (fieldName: string) => {
    const errorMessage = errors[fieldName]?.message;
    return errorMessage ? (
      <span role="alert" className="mt-1 text-sm text-red-500 dark:text-red-900">
        {String(errorMessage)}
      </span>
    ) : null;
  };

  const handleResendEmail = () => {
    const email = getValues('email');
    if (!email) {
      return setShowResendLink(false);
    }
    resendLinkMutation.mutate({ email });
  };

  return (
    <>
      {showResendLink && (
        <div className="mt-2 rounded-md border bg-green-500/10 px-3 py-2 text-sm text-gray-600">
          {localize('com_auth_email_verification_resend_prompt')}
          <button
            type="button"
            className="ml-2 text-blue-600 hover:underline"
            onClick={handleResendEmail}
            disabled={resendLinkMutation.isLoading}
          >
            {localize('com_auth_email_resend_link')}
          </button>
        </div>
      )}
      <form
        className="mt-6"
        aria-label="Login form"
        method="POST"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <div className="mb-4">
          <div className="relative">
            <label
              htmlFor="email"
              className="text-base text-text-secondary-alt mb-1 rtl:peer-focus:left-auto"
            >
              {useUsernameLogin
                ? localize('com_auth_username').replace(/ \(.*$/, '')
                : localize('com_auth_email_address')}
            </label>
            <input
              type="text"
              id="email"
              autoComplete={useUsernameLogin ? 'username' : 'email'}
              aria-label={localize('com_auth_email')}
              {...register('email', {
                required: localize('com_auth_email_required'),
                maxLength: { value: 120, message: localize('com_auth_email_max_length') },
                pattern: {
                  value: useUsernameLogin ? /\S+/ : /\S+@\S+\.\S+/,
                  message: localize('com_auth_email_pattern'),
                },
              })}
              aria-invalid={!!errors.email}
              className="
                peer w-full rounded-full text-[#333] placeholder:text-[#666] border border-[#666]
                bg-transparent px-4 pb-2.5 pt-3 duration-200 focus:outline-black outline-offset-0
              "
              placeholder=" "
            />
          </div>
          {renderError('email')}
        </div>
        <div className="mb-2">
          <div className="relative">
            <label
              htmlFor="password"
              className="text-base text-text-secondary-alt mb-1 rtl:peer-focus:left-auto"
            >
              {localize('com_auth_password')}
            </label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              aria-label={localize('com_auth_password')}
              {...register('password', {
                required: localize('com_auth_password_required'),
                minLength: { value: 8, message: localize('com_auth_password_min_length') },
                maxLength: { value: 128, message: localize('com_auth_password_max_length') },
              })}
              aria-invalid={!!errors.password}
              className="
                peer w-full rounded-full text-[#333] placeholder:text-[#666] border border-[#666]
                bg-transparent px-4 pb-2.5 pt-3 duration-200 focus:outline-black outline-offset-0
                "
              placeholder=" "
            />
          </div>
          {renderError('password')}
        </div>
        {startupConfig.passwordResetEnabled && (
          <a href="/forgot-password" className="text-sm text-[#111] underline underline-offset-2">
            {localize('com_auth_password_forgot')}
          </a>
        )}
        <div className="mt-6">
          <button
            aria-label="Sign in"
            data-testid="login-button"
            type="submit"
            className="bg-[#463cff] hover:bg-[#7770ff] disabled:bg-[#444] text-white w-full active:scale-95 transform rounded-full px-4 py-3 tracking-wide transition-all ease-out duration-300"
          >
            {isSubmitting ? <Spinner />: localize('com_auth_continue')}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
