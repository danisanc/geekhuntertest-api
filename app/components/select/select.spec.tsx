import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import '@testing-library/jest-dom';

import Select from './index';

describe("Testing select component", () => {
  const Component = (
    <Select
      name="techs"
      label="Competencias"
      options={[
        { value: 'Java', label: 'Java' },
        { value: 'Ruby', label: 'Ruby' }
      ]}
      onChange={() => { }}
      isMulti
    />
  )

  it("should be able to show the select element and correct label", () => {
    render(Component);
    expect(screen.getByText('Competencias')).toBeInTheDocument();
  });
});