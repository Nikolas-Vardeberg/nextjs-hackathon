import Loader from "./index";
import { render } from "@testing-library/react";

describe("Loader", () => {
  it("renders the loader", () => {
    const { getByTestId } = render(<Loader loading>Test</Loader>);
    expect(getByTestId("loader")).toMatchSnapshot();
  });

  it("renders renders the children when not loading", () => {
    const { getByTestId } = render(
      <Loader loading={false}>
        <div data-testid="child">Test</div>
      </Loader>,
    );
    expect(getByTestId("child")).toMatchSnapshot();
  });
});
