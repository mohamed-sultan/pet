import React from 'react';
import { render } from '@testing-library/react';
import UpdatePet from '../UpdatePet';

describe('UpdatePet', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<UpdatePet />);
    expect(asFragment()).toMatchSnapshot();
  });
}); 