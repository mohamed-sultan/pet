import { useMemo } from 'react';

interface Pet {
  id: number;
  name: string;
  status: string;
  tags?: { id: number; name?: string }[];
}

export const useSearchPet = (pets: Pet[], searchQuery: string, selectedStatus: string) => {
  return useMemo(() => {
    return pets.filter(pet => {
      const matchesStatus = pet.status === selectedStatus;
      const matchesSearch =
        (pet.name && pet.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (pet.tags && pet.tags.some((tag: { name?: string }) => tag.name && tag.name.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesStatus && matchesSearch;
    });
  }, [pets, searchQuery, selectedStatus]);
}; 