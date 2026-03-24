'use client';

import { Button } from '@/ui/button/Button';
import { Field } from '@/ui/field/Field';
import { Textarea } from '@/ui/field/Textarea';

import { useSettings } from '@/app/studio/settings/useSettings';

export function SettingsForm() {
  const {
    formObject: {
      handleSubmit,
      register,
      formState: { errors },
    },
    onSubmit,
    isProfileLoading,
    isLoading,
  } = useSettings();

  if (isProfileLoading) return <div>Loading...</div>;

  return (
    <div className='w-3/5'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <Field
              label='Email'
              type='email'
              registration={register('email', { required: 'Email is required!' })}
              error={errors.email?.message}
              placeholder='Enter email:'
              autoComplete='email'
            />
            <Field
              label='Password'
              type='password'
              registration={register('password', { required: 'Password is required!' })}
              error={errors.password?.message}
              placeholder='Enter password:'
              autoComplete='current-password'
            />
            <Field
              label='Name'
              type='text'
              registration={register('name')}
              error={errors.name?.message}
              placeholder='Enter name:'
              autoComplete='name'
            />
            <Field
              label='Slug (alias)'
              type='text'
              registration={register('channel.slug')}
              error={errors.channel?.slug?.message}
              placeholder='Enter slug:'
              autoComplete='slug'
            />
            <Textarea
              label='Description'
              registration={register('channel.description')}
              error={errors.channel?.description?.message}
              placeholder='Enter description:'
              rows={4}
            />
          </div>
        </div>

        <div></div>

        <div className='mt-6 text-center'>
          <Button
            type='submit'
            isLoading={isLoading}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
