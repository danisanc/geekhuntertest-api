import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import Input from './index';

describe("Testing input form", () => {
  const Component = (
    <Input
      label="Experiencia maxima"
      name="maxExp"
      onChange={() => { }}
      type="number"
    />
  )

  it("should be able to show the input element", () => {
    render(Component);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it("should be able to show the correct label", () => {
    render(Component);
    expect(screen.getByText('Experiencia maxima')).toBeInTheDocument();
  });

  it("should be able to show the correct name", () => {
    render(Component);
    expect(screen.getByTestId('input').getAttribute('name')).toEqual('maxExp');
  });

  it("should be able to show the correct type", () => {
    render(Component);
    expect(screen.getByTestId('input').getAttribute('type')).toEqual('number');
  });
});