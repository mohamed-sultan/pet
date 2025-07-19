import { useQuery } from '@tanstack/react-query';

const fetchPets = async (status: string) => {
  const response = await fetch(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`, {
    headers: { 'accept': 'application/json' },
  });
  const data = await response.json();
  if (Array.isArray(data)) {
    return data.map((pet: any) => ({ ...pet}));
  }
  return [];
};

export const usePets = (status: string) => {
  return useQuery({
    queryKey: ['pets', status],
    queryFn: () => fetchPets(status),
    enabled: !!status,
  });
}; 