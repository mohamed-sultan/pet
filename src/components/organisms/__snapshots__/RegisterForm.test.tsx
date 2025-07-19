import React from 'react';
import { render } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';

describe('RegisterForm', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<RegisterForm />);
    expect(asFragment()).toMatchSnapshot();
  });
}); 