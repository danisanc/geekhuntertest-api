import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import Submit from './index';

describe("Testing submit button", () => {
  it("should be able to show the button element", () => {
    render(
      <Submit disabled={false}>Enviar</Submit>
    );

    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });

  it("should be able to show the correct text", () => {
    render(
      <Submit disabled={false}>Enviar</Submit>
    );

    expect(screen.getByText(/Enviar/i)).toBeInTheDocument();
  });
});