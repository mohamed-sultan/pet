import { useQuery, useMutation } from '@tanstack/react-query';

const fetchPet = async (id: string) => {
  const res = await fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
    headers: { accept: 'application/json' },
  });
  if (!res.ok) throw new Error('Pet not found');
  return res.json();
};

export const useFetchPet = (id: string) => {
  return useQuery({
    queryKey: ['pet', id],
    queryFn: () => fetchPet(id),
    enabled: !!id,
  });
};

const updatePet = async ({ id, name, status, petId }: { id: string; name: string; status: string; petId?: string }) => {
  const params: Record<string, string> = { name, status };
  if (petId) params['petId'] = petId;
  const response = await fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(params).toString(),
  });
  if (!response.ok) throw new Error('Update failed');
  return response.json();
};

export const usePet = () => {
  const updatePetMutation = useMutation({
    mutationFn: updatePet,
  });
  return { updatePetMutation };
}; 