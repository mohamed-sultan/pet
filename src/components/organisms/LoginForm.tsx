import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Form, Input, notification } from 'antd';
import { useAuth } from '../../service/useAuth';
import { useUserStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';

interface LoginFormFields {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormFields>({
    mode: 'onChange',
    defaultValues: {
      username: 'sultan',
      password: 'Pass@1234',
    },
  });
  const { loginMutation } = useAuth();
  const setLogin = useUserStore((state) => state.setLogin);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onSubmit = (data: LoginFormFields) => {
    loginMutation.mutate(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          setLogin({ username: data.username }); 
          
          api.info({
            message: `Welcome back`,
            description:
              'Welcome back! you can start browsing now',
            placement:'topRight',
          });
          setTimeout(() => {
            navigate('/home');
          }, 300);
        },
      }
    );
  };

  return (
    <>
    {contextHolder}
   
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Username" validateStatus={errors.username ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.username?.message}</span>}>
        <Controller
          name="username"
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Enter your username"
              size="large"
              style={{ borderRadius: 8 }}
            />
          )}
        />
      </Form.Item>
      <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={<span style={{ textAlign: 'left', display: 'block' }}>{errors.password?.message}</span>}>
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <Input.Password
              {...field}
              placeholder="Enter your password"
              size="large"
              style={{ borderRadius: 8 }}
            />
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
          loading={isSubmitting || loginMutation.status === 'pending'}
        >
          Sign In
        </Button>
      </Form.Item>
      </Form>
      </>
  );
}; 