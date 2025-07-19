import React from 'react';
import { Skeleton } from 'antd';

interface PetSkeletonProps {
  key?: React.Key;
  style?: React.CSSProperties;
}

export const PetSkeleton: React.FC<PetSkeletonProps> = ({ key, style }) => (
  <Skeleton key={key} active paragraph={{ rows: 2 }} style={{ marginBottom: 16, ...style }} />
); 