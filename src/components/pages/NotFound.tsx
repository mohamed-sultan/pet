import React from 'react';
import { Button } from 'antd';
import { useUserStore } from '../../store/userStore';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';

const NotFound: React.FC = () => {
  const isLogin = useUserStore((state) => state.isLogin);
  const isDark = useThemeStore((state) => state.isDark);
  const navigate = useNavigate();
  const textColor = isDark ? '#fff' : '#222';
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, marginBottom: 16, color: textColor }}>404</h1>
        <p style={{ fontSize: 20, color: textColor }}>Page Not Found</p>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 24 }}
          onClick={() => navigate(isLogin ? '/home' : '/login')}
        >
          {isLogin ? 'Go to Home' : 'Go to Login'}
        </Button>
      </div>
    </div>
  );
};

export default NotFound; 