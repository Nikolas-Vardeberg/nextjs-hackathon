import Test from "./index";
import { render } from "@testing-library/react";

describe("Title", () => {
  it("renders the title", () => {
    const { getByText } = render(<Test title="Test Title" />);
    expect(getByText("Test Title").textContent).toBe("Test Title");
  });
  it("renders the title with custom class", () => {
    const { getByText } = render(<Test className="xl" title="Test Title" />);
    expect(getByText("Test Title").className).toBe("text xl");
  });
});
