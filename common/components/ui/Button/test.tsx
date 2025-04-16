import Button from "./index";
import { render } from "@testing-library/react";

describe("Button", () => {
  it("should show loading indicator when loading is true", () => {
    const { getByTestId } = render(<Button loading />);
    expect(getByTestId("button").firstElementChild?.classList).toContain(
      "animate-spin",
    );
  });

  it("should show not show a loading indicator when loading is undefined", () => {
    const { getByTestId } = render(<Button />);
    expect(
      getByTestId("button").firstElementChild?.classList.contains(
        "animate-spin",
      ),
    ).toBeFalsy();
  });

  it("should render children with custom class names", () => {
    const { getByTestId } = render(<Button className="xl">Test</Button>);
    expect(getByTestId("button").className).toContain("xl");
    expect(getByTestId("button").textContent).toBe("Test");
  });

  it("should render with variant link", () => {
    const { getByTestId } = render(<Button variant="link">Test</Button>);
    expect(getByTestId("button").className).toContain("underline");
  });

  it("should render with variant primary", () => {
    const { getByTestId } = render(<Button variant="primary">Test</Button>);
    expect(getByTestId("button").className).toContain(
      "bg-primary text-white hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary",
    );
  });

  it("should render with variant outline", () => {
    const { getByTestId } = render(<Button variant="outline">Test</Button>);
    expect(getByTestId("button").className).toContain(
      "text-gray-600 border border-gray-600 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black",
    );
  });

  it("should render with variant link", () => {
    const { getByTestId } = render(<Button size="icon">Test</Button>);
    expect(getByTestId("button").className).toContain("h-9");
  });
});
