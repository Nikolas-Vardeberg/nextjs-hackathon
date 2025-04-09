import { ThemeProvider } from "./theme-provider";
import { render } from "@testing-library/react";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("Providers", () => {
  it("should render the theme provider without error", () => {
    const { getByTestId } = render(
      <div data-testid="theme">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div data-testid="test" />
        </ThemeProvider>
      </div>,
    );
    expect(getByTestId("theme")).toMatchSnapshot();
  });
});
