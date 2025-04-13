import Badge from "./index";
import { render } from "@testing-library/react";

describe("Badge", () => {
  it("renders the default varient badge with class name", () => {
    const { getByText } = render(
      <Badge className="test" variant="default">
        1
      </Badge>,
    );
    expect(getByText("1").className).toContain("test");
  });
});
