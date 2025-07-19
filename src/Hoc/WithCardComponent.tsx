import React from 'react';
import { Card } from 'antd';

interface WithCardComponentProps {
  children: React.ReactNode;
}

const WithCardComponent: React.FC<WithCardComponentProps> = ({ children }) => (
  <div className="with-card-center">
    <Card className="with-card">
      {children}
    </Card>
  </div>
);

export default WithCardComponent; 