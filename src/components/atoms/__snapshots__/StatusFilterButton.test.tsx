import React from 'react';
import { render } from '@testing-library/react';
import { StatusFilterButton } from '../StatusFilterButton';

describe('StatusFilterButton', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <StatusFilterButton status="available" selectedStatus="available" onClick={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
}); 