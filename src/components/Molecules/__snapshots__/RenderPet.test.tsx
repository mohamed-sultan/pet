import React from 'react';
import { render } from '@testing-library/react';
import { RenderPet } from '../RenderPet';

describe('RenderPet', () => {
  it('matches snapshot', () => {
    const mockPets = [
      { id: 1, name: 'Fluffy', image: 'https://example.com/fluffy.jpg', status: 'available', tag: 'cat' },
      { id: 2, name: 'Rex', image: 'https://example.com/rex.jpg', status: 'pending', tag: 'dog' },
    ];
    const { asFragment } = render(<RenderPet filteredPets={mockPets} navigate={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
}); 