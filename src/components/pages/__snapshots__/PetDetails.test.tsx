import React from 'react';
import { render } from '@testing-library/react';
import PetDetails from '../PetDetails';

describe('PetDetails', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<PetDetails />);
    expect(asFragment()).toMatchSnapshot();
  });
}); 