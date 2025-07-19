import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Input, notification } from 'antd';
import { useAuth } from '../../service/useAuth';

interface RegisterFormFields {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export const RegisterForm: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegisterFormFields>({
    mode: 'onChange',
    defaultValues: {
      username: 'sultan',
      firstName: 'sultan',
      lastName: 'sultan',
      email: 'sultan@gmail.com',
      password: 'Pass@1234',
      phone: '01030053285',
    },
  });
  const { registerMutation } = useAuth();

  const onRegister = (data: RegisterFormFields) => {
    registerMutation.mutate({
      ...data,
      id: Date.now(),
      userStatus: 0,
    }, {
      onSuccess: () => {
        api.info({
          message: `User registered successfully`,
          description:
            'you can login now with your credentials',
          placement:'topRight',
        });
      }
    });
  };

  return (
    <>
    {contextHolder}
    <Form layout="vertical" onFinish={handleSubmit(onRegister)}>
      <Form.Item label="Username" validateStatus={errors.username ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.username?.message}</span>}>
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your username" size="large" style={{ borderRadius: 8 }} />
          )}
        />
      </Form.Item>
      <Form.Item label="First Name" validateStatus={errors.firstName ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.firstName?.message}</span>}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: 'First name is required' }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your first name" size="large" style={{ borderRadius: 8 }} />
          )}
        />
      </Form.Item>
      <Form.Item label="Last Name" validateStatus={errors.lastName ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.lastName?.message}</span>}>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: 'Last name is required' }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your last name" size="large" style={{ borderRadius: 8 }} />
          )}
        />
      </Form.Item>
      <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.email?.message}</span>}>
        <Controller
          name="email"
          control={control}
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your email" size="large" style={{ borderRadius: 8 }} />
          )}
        />
      </Form.Item>
      <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.password?.message}</span>}>
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <Input.Password {...field} placeholder="Enter your password" size="large" style={{ borderRadius: 8 }} />
          )}
        />
      </Form.Item>
      <Form.Item label="Phone" validateStatus={errors.phone ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.phone?.message}</span>}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: 'Phone is required' }}
          render={({ field }) => (
            <Input {...field} placeholder="Enter your phone" size="large" style={{ borderRadius: 8 }} />
          )}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          style={{
            background: '#111827',
            borderRadius: 8,
            border: 'none',
            fontWeight: 600,
            marginTop: 8
          }}
          loading={isSubmitting || registerMutation.status === 'pending'}
        >
          Sign Up
        </Button>
      </Form.Item>
      </Form>
      </>
  );
}; 