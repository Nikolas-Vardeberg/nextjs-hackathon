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

  it("should render with variant default", () => {
    const { getByTestId } = render(<Button variant="default">Test</Button>);
    expect(getByTestId("button").className).toContain(
      "bg-black text-white hover:bg-black/80",
    );
  });

  it("should render with variant outline", () => {
    const { getByTestId } = render(<Button variant="outline">Test</Button>);
    expect(getByTestId("button").className).toContain(
      "text-black border border-black",
    );
  });

  it("should render with variant link", () => {
    const { getByTestId } = render(<Button size="icon">Test</Button>);
    expect(getByTestId("button").className).toContain("h-9");
  });
});
