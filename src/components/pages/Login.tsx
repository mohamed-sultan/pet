import { LoginForm } from '../organisms/LoginForm';
import {  Tabs, Typography } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useState } from 'react';
import { RegisterForm } from '../organisms/RegisterForm';
import { useThemeStore } from '../../store/themeStore';
import WithCardComponent from '../../Hoc/WithCardComponent';
import PawIcon from '../../icon/PawIcon';

const { Title, Text } = Typography;


export default function Login() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'80vh'}}>
    <WithCardComponent>
        <div  className="login-header-icons">
          <PawIcon color={isDark ? '#fff' : '#222'} />
          <HeartFilled className="login-heart-icon" />
        </div>
        <Title level={2} className="login-title">Pet World</Title>
        <Text type="secondary" className="login-subtitle">
          Join our community of pet lovers
        </Text>
        <Tabs
          activeKey={activeTab}
          onChange={key => setActiveTab(key as 'signin' | 'signup')}
          centered
          items={[
            { key: 'signin', label: <b className={isDark ? 'login-signin-dark' : 'login-signin'}>Sign In</b>, children: null },
            { key: 'signup', label: <span className="login-signup">Sign Up</span>, children: null }
          ]}
          tabBarStyle={undefined}
        />
        {activeTab === 'signin' ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </WithCardComponent>
      </div>
  );
} 