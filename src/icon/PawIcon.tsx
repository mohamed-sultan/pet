import React from 'react';

export interface PawIconProps {
  color?: string;
}

const PawIcon: React.FC<PawIconProps> = ({ color = '#222' }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <ellipse cx="6" cy="10" rx="2" ry="3" fill={color} />
    <ellipse cx="18" cy="10" rx="2" ry="3" fill={color} />
    <ellipse cx="12" cy="5" rx="2.5" ry="3.5" fill={color} />
    <ellipse cx="12" cy="17" rx="7" ry="5" fill={color} />
  </svg>
);

export default PawIcon; 