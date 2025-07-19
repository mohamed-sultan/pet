import React from 'react';
import { render } from '@testing-library/react';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <SearchInput value="" onChange={() => {}} placeholder="Search..." />
    );
    expect(asFragment()).toMatchSnapshot();
  });
}); 