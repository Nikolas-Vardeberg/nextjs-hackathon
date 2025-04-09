import Input from "./index";
import { render } from "@testing-library/react";

describe("Input", () => {
  it("renders the input", () => {
    const { getByTestId } = render(<Input />);
    expect(getByTestId("input")).toMatchSnapshot();
  });
});
