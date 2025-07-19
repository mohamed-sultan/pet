import React from 'react';
import { Card } from 'antd';

interface WithCardComponentProps {
  children: React.ReactNode;
}

const WithCardComponent: React.FC<WithCardComponentProps> = ({ children }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Card
      style={{
        width: '90vw',
        maxWidth: 400,
        borderRadius: 16,
        boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
        border: 'none',
      }}
      bodyStyle={{ padding: 32 }}
    >
      {children}
    </Card>
  </div>
);

export default WithCardComponent; 