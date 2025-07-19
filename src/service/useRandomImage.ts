import { useQuery } from '@tanstack/react-query';

const fetchRandomImage = async () => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await res.json();
  return data[0]?.url || null;
};

export const useRandomImage = (id: string) => {
  return useQuery({
    queryKey: ['randomCatImage', id],
    queryFn: fetchRandomImage,
    staleTime: 1000 * 60*60, // 1 minute
  });
}; 