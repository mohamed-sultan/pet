import React from 'react';
import { render } from '@testing-library/react';
import { PetSkeleton } from '../PetSkeleton';

describe('PetSkeleton', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<PetSkeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
}); 