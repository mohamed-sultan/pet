
import './App.css'
import {  ConfigProvider } from 'antd';
import { theme  } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import Header from './components/atoms/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import PetDetails from './components/pages/PetDetails';
import UpdatePet from './components/pages/UpdatePet';
import { withAuth } from './Hoc/withAuth';
import React from 'react';
import NotFound from './components/pages/NotFound';

const App = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const { token } = theme.useToken();
  const bgColor = isDark ? 'black' : (token.colorPrimaryBg || '#f0f5ff');
  return (
    <div style={{ minHeight: '100vh', padding: 24, background: bgColor,width:'100%' }}> 
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <BrowserRouter>
        <div > 
          <Header />
          <div style={{ marginTop: 32 }}>
            <Routes  >
              <Route path="/home" element={React.createElement(withAuth(Home))} />
              <Route path="/login" element={<Login />} />
              <Route path="/pet/:id" element={React.createElement(withAuth(PetDetails))} />
              <Route path="/update-pet/:id" element={React.createElement(withAuth(UpdatePet))} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      </ConfigProvider>
      </div>
  );
};

export default App