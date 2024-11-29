import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useNavigate, useOutletContext, useLocation } from 'react-router-dom';
import { useRegisterUserMutation } from 'librechat-data-provider/react-query';
import type { TRegisterUser, TError } from 'librechat-data-provider';
import type { TLoginLayoutContext } from '~/common';
import { ErrorMessage } from './ErrorMessage';
import { Spinner } from '~/components/svg';
import { useLocalize } from '~/hooks';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const localize = useLocalize();
  const { startupConfig, startupConfigError, isFetching } = useOutletContext<TLoginLayoutContext>();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterUser>({ mode: 'onChange' });
  const password = watch('password');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState<number>(3);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const registerUser = useRegisterUserMutation({
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      setIsSubmitting(false);
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            navigate('/c/new', { replace: true });
            return 0;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    },
    onError: (error: unknown) => {
      setIsSubmitting(false);
      if ((error as TError).response?.data?.message) {
        setErrorMessage((error as TError).response?.data?.message ?? '');
      }
    },
  });

  const renderInput = (id: string, label: string, type: string, validation: object) => (
    <div className="mb-4">
      <div className="relative">
        <label
          htmlFor={id}
          className="text-base text-text-secondary-alt mb-1 rtl:peer-focus:left-auto"
        >
          {localize(label)}
        </label>
        <input
          id={id}
          type={type}
          autoComplete={id}
          aria-label={localize(label)}
          {...register(
            id as 'name' | 'email' | 'username' | 'password' | 'confirm_password',
            validation,
          )}
          aria-invalid={!!errors[id]}
          className="
            peer w-full rounded-full text-[#333] placeholder:text-[#666] border border-[#666]
            bg-transparent px-4 pb-2.5 pt-3 duration-200 focus:outline-black outline-offset-0
          "
          placeholder=" "
          data-testid={id}
        />
      </div>
      {errors[id] && (
        <span role="alert" className="mt-1 text-sm text-red-500">
          {String(errors[id]?.message) ?? ''}
        </span>
      )}
    </div>
  );

  return (
    <>
      {errorMessage && (
        <ErrorMessage>
          {localize('com_auth_error_create')} {errorMessage}
        </ErrorMessage>
      )}
      {registerUser.isSuccess && countdown > 0 && (
        <div
          className="rounded-md border border-green-500 bg-green-500/10 px-3 py-2 text-sm text-gray-600 dark:text-gray-200"
          role="alert"
        >
          {localize(
            startupConfig?.emailEnabled
              ? 'com_auth_registration_success_generic'
              : 'com_auth_registration_success_insecure',
          ) +
            ' ' +
            localize('com_auth_email_verification_redirecting', countdown.toString())}
        </div>
      )}
      {!startupConfigError && !isFetching && (
        <>
          <form
            className="mt-6"
            aria-label="Registration form"
            method="POST"
            onSubmit={handleSubmit((data: TRegisterUser) =>
              registerUser.mutate({ ...data, token: token ?? undefined }),
            )}
          >
            {renderInput('name', 'com_auth_full_name', 'text', {
              required: localize('com_auth_name_required'),
              minLength: {
                value: 3,
                message: localize('com_auth_name_min_length'),
              },
              maxLength: {
                value: 80,
                message: localize('com_auth_name_max_length'),
              },
            })}
            {renderInput('username', 'com_auth_username', 'text', {
              minLength: {
                value: 2,
                message: localize('com_auth_username_min_length'),
              },
              maxLength: {
                value: 80,
                message: localize('com_auth_username_max_length'),
              },
            })}
            {renderInput('email', 'com_auth_email', 'email', {
              required: localize('com_auth_email_required'),
              minLength: {
                value: 1,
                message: localize('com_auth_email_min_length'),
              },
              maxLength: {
                value: 120,
                message: localize('com_auth_email_max_length'),
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: localize('com_auth_email_pattern'),
              },
            })}
            {renderInput('password', 'com_auth_password', 'password', {
              required: localize('com_auth_password_required'),
              minLength: {
                value: 8,
                message: localize('com_auth_password_min_length'),
              },
              maxLength: {
                value: 128,
                message: localize('com_auth_password_max_length'),
              },
            })}
            {renderInput('confirm_password', 'com_auth_password_confirm', 'password', {
              validate: (value: string) =>
                value === password || localize('com_auth_password_not_match'),
            })}
            <div className="mt-6">
              <button
                disabled={Object.keys(errors).length > 0}
                type="submit"
                aria-label="Submit registration"
                className="bg-[#463cff] hover:bg-[#7770ff] disabled:bg-[#444] text-white w-full active:scale-95 transform rounded-full px-4 py-3 tracking-wide transition-all ease-out duration-300"
              >
                {isSubmitting ? <Spinner /> : localize('com_auth_continue')}
              </button>
            </div>
          </form>
          <p className="my-4 text-sm text-[#333] text-center mb-[52px]">
            {localize('com_auth_already_have_account')}{' '}
            <a href="/login" aria-label="Login" className="text-black underline underline-offset-2">
              {localize('com_auth_login')}
            </a>
          </p>
          <p className="text-sm text-[#333] text-center">
            By creating an account, you agree to the Terms of use and Privacy Policy.
          </p>
        </>
      )}
    </>
  );
};

export default Registration;
