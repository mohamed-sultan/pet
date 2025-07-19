import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder }) => (
  <Input
    placeholder={placeholder || 'Search...'}
    prefix={<SearchOutlined />}
    value={value}
    onChange={onChange}
    style={{ maxWidth: 400, height: 48 }}
    allowClear
  />
); 