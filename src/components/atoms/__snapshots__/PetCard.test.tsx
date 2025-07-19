import React from 'react';
import { render } from '@testing-library/react';
import { PetCard } from '../PetCard';

describe('PetCard', () => {
  it('matches snapshot', () => {
    const mockPet = {
      name: 'Fluffy',
      image: 'https://example.com/fluffy.jpg',
      status: 'available',
      tag: 'cat',
    };
    const { asFragment } = render(<PetCard pet={mockPet} />);
    expect(asFragment()).toMatchSnapshot();
  });
}); 