import React from 'react';
import { Card, Badge } from 'antd';

export interface PetCardPet {
  id: string | number;
  name: string;
  image: string;
  tag: string;
  status: 'available' | 'pending' | 'adopted' | string;
}

interface PetCardProps {
  pet: PetCardPet;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'green';
    case 'pending':
      return 'orange';
    case 'adopted':
      return 'blue';
    default:
      return 'default';
  }
};

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <Card
      hoverable
      style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', background: 'linear-gradient(135deg, #fff 60%, #f0f5ff 100%)', border: 0 }}
      bodyStyle={{ padding: 0 }}
      className="pet-card"
    >
      <div style={{ position: 'relative', overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        <img
          src={pet.image}
          alt={pet.name}
          style={{ width: '100%', height: 256, objectFit: 'cover', transition: 'transform 0.3s', display: 'block' }}
          className="pet-card-img"
        />
        <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
          <Badge
            color={getStatusColor(pet.status)}
            text={pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
            style={{ padding: '4px 12px', fontWeight: 500, fontSize: 14, borderRadius: 8 }}
          />
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{pet.name}</h3>
        <div style={{ color: '#888', fontWeight: 500 }}>{pet.tag}</div>
      </div>
    </Card>
  );
}; 