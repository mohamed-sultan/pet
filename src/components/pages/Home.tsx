import React, { useState } from 'react';
import {  Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RenderPet } from '../Molecules/RenderPet';
import { usePets } from '../../service/usePets';
import { StatusFilterButton } from '../atoms/StatusFilterButton';
import { SearchInput } from '../atoms/SearchInput';
import { PetSkeleton } from '../atoms/PetSkeleton';
import { useSearchPet } from '../../hooks/useSearchPet';


const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'available' | 'pending' | 'sold'>('available');
  const { data: pets = [], isLoading: loading } = usePets(selectedStatus);
  const navigate = useNavigate();

  // Filtered pets
  const filteredPets = useSearchPet(pets, searchQuery, selectedStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Typography.Title level={2}>Available Pets</Typography.Title>
      <div className="search-filter-container">
        <SearchInput
          placeholder="Search by name or tag..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <Space wrap>
          <StatusFilterButton status="available" selectedStatus={selectedStatus} onClick={s => setSelectedStatus(s as 'available' | 'pending' | 'sold')} />
          <StatusFilterButton status="pending" selectedStatus={selectedStatus} onClick={s => setSelectedStatus(s as 'available' | 'pending' | 'sold')} />
          <StatusFilterButton status="sold" selectedStatus={selectedStatus} onClick={s => setSelectedStatus(s as 'available' | 'pending' | 'sold')} />
        </Space>
      </div>
      {loading ? (
        <>
          {[...Array(5)].map((_, idx) => (
            <PetSkeleton key={idx} />
          ))}
        </>
      ) : (
        <RenderPet filteredPets={filteredPets as any}  navigate={navigate} />
      )}
    </div>
  );
};

export default Home; 