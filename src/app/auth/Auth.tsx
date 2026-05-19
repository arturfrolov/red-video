'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, useWatch } from 'react-hook-form';

import { Logo } from '@/components/layout/sidebar/header/Logo';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { SkeletonLoader } from '@/ui/skeleton-loader/SkeletonLoader';

import type { IAuthForm } from './auth-form.types';
import { SwitchAuth } from '@/app/auth/SwitchAuth';
import { useAuthForm } from '@/app/auth/useAuthForm';

import styles from './captcha.module.scss';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IAuthForm>({
    mode: 'onChange',
  });

  const password = useWatch({ control, name: 'password' });

  const { isLoading, onSubmit, recaptchaRef } = useAuthForm(isLogin ? 'login' : 'register', reset);

  return (
    <div className='flex min-h-dvh w-full items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md rounded border border-border p-5 sm:p-layout'>
        <div className='mb-1 text-center'>
          <Logo />
        </div>

        <SwitchAuth
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {isLoading ? (
            <SkeletonLoader count={3} />
          ) : (
            <>
              <Field
                label='Email'
                type='email'
                registration={register('email', { required: 'Email is required!' })}
                error={errors.email?.message}
                placeholder='Enter email:'
                autoComplete='username'
              />
              <Field
                label='Password'
                type='password'
                registration={register('password', { required: 'Password is required!' })}
                error={errors.password?.message}
                placeholder='Enter password:'
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              {!isLogin && (
                <Field
                  label='Password confirm'
                  type='password'
                  registration={register('confirmPassword', {
                    required: 'Password confirmation is required!',
                    validate: (value) => value === password || 'Passwords don`t match',
                  })}
                  error={errors.confirmPassword?.message}
                  placeholder='Enter password again:'
                  autoComplete='new-password'
                />
              )}
              <ReCAPTCHA
                ref={recaptchaRef}
                size='normal'
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                theme='light'
                className={styles.recaptcha}
              />
              <div className='mt-6 text-center'>
                <Button
                  type='submit'
                  isLoading={isLoading}
                >
                  {isLogin ? 'Login' : 'Registration'}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
