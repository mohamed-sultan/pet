import React from 'react';
import { Button } from 'antd';

interface StatusFilterButtonProps {
  status: string;
  selectedStatus: string;
  onClick: (status: string) => void;
}

const getActiveBg = (status: string) => {
  switch (status) {
    case 'available':
      return '#eafff0'; // very light green
    case 'pending':
      return '#fffbe6'; // very light orange/yellow
    case 'sold':
      return '#e6f7ff'; // very light blue
    default:
      return undefined;
  }
};

export const StatusFilterButton: React.FC<StatusFilterButtonProps> = ({ status, selectedStatus, onClick }) => (
  <Button
    type={selectedStatus === status ? 'primary' : 'default'}
    onClick={() => onClick(status)}
    style={{
      textTransform: 'capitalize',
      background: selectedStatus === status ? getActiveBg(status) : undefined,
      color: selectedStatus === status ? '#222' : undefined,
      borderColor: selectedStatus === status ? getActiveBg(status) : undefined,
    }}
  >
    {status}
  </Button>
); 