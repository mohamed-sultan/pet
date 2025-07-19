import React from 'react';
import { List, Skeleton, Card, Badge } from 'antd';
import { useRandomImage } from '../../service/useRandomImage';

interface Pet {
  id: number;
  name: string;
  status: string;
  tags?: { id: number; name: string }[];
  catImageUrl?: string;
  imageLoading?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'green';
    case 'pending':
      return 'orange';
    case 'sold':
      return 'blue';
    default:
      return 'default';
  }
};

interface RenderPetProps {
  filteredPets: Pet[];
  navigate: (path: string) => void;
  pets?: Pet[];
}

const PetListItem: React.FC<{ item: Pet; navigate: (path: string) => void }> = ({ item, navigate }) => {
  const { data: randomImage, isLoading: imageLoading } = useRandomImage(String(item.id));
  return (
    <List.Item style={{ maxWidth: '100%', margin: 0, padding: 0 }}>
      { imageLoading ? (
        <Skeleton active paragraph={{ rows: 2 }} style={{ marginBottom: 16, height: 350 }} />
      ) : (
        <div onClick={() => navigate(`/pet/${item.id}`)} style={{ cursor: 'pointer' }}>
          <Card
            hoverable
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              background: 'linear-gradient(135deg, #fff 60%, #f0f5ff 100%)',
              border: 0,
              width: '95%',
              maxWidth: '100%',
            }}
            bodyStyle={{ padding: 0 }}
            className="pet-card"
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
              <img
                src={randomImage }
                alt={item.name}
                style={{ width: '100%', height: 256, objectFit: 'cover', transition: 'transform 0.3s', display: 'block' }}
                className="pet-card-img"
              />
              <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                <Badge
                  color={getStatusColor(item.status)}
                  text={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  style={{
                    padding: '4px 12px',
                    fontWeight: 500,
                    fontSize: 14,
                    borderRadius: 8,
                    backgroundColor:
                      item.status === 'available'
                        ? 'green'
                        : item.status === 'pending'
                        ? 'orange'
                        : item.status === 'sold'
                        ? '#91d5ff'
                        : undefined,
                    color: '#fff',
                  }}
                />
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: '#222' }}>{item.name}</h3>
              <div style={{ color: '#888', fontWeight: 500 }}>{item.tags && item.tags.length > 0 ? item.tags.map(t => t.name).join(', ') : 'No tags'}</div>
            </div>
          </Card>
        </div>
      )}
    </List.Item>
  );
};

export const RenderPet: React.FC<RenderPetProps> = ({ filteredPets, navigate }) => {
  console.log('sultan2',filteredPets)
  return  (
    <List
      grid={{
        gutter: 24,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={filteredPets}
      renderItem={item => <PetListItem item={item} navigate={navigate} />}
    />
  ); 
}