import { render, screen } from "@testing-library/react";
import App from "App";

test("renders default Hello content", () => {
  render(<App />);
  const defaultContent = screen.getByText(/Hello/i);
  expect(defaultContent).toBeInTheDocument();
});
