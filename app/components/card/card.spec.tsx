import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import Card from './index';

describe("Testing candidate card", () => {
  const Component = (
    <Card candidate={{
      id: 123456,
      city: 'São Paulo - SP',
      experience: '4-5 years',
      technologies: [
        {
          name: "React",
          is_main_tech: true
        },
        {
          name: "Node.js",
          is_main_tech: false
        },
        {
          name: "JavaScript",
          is_main_tech: true
        },
        {
          name: "HTML5",
          is_main_tech: false
        }
      ]
    }} />
  )

  it("should be able to show the article element", () => {
    render(Component);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it("should be able to show the correct city", () => {
    render(Component);
    expect(screen.getByText('São Paulo - SP')).toBeInTheDocument();
  });

  it("should be able to show the correct experience", () => {
    render(Component);
    expect(screen.getByText('4-5 anos')).toBeInTheDocument();
  });

  it("should be able to show the correct technologies", () => {
    render(Component);
    expect(screen.getByText('React, Node.js, JavaScript, HTML5')).toBeInTheDocument();
  });
});