import { useMutation } from '@tanstack/react-query';

const login = async ({ username, password }: { username: string; password: string }) => {
  const params = new URLSearchParams({ username, password });
  const response = await fetch(`https://petstore.swagger.io/v2/user/login?${params.toString()}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

const register = async (user: {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}) => {
  const response = await fetch('https://petstore.swagger.io/v2/user', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: login,
  });
  const registerMutation = useMutation({
    mutationFn: register,
  });
  return { loginMutation, registerMutation };
}; 