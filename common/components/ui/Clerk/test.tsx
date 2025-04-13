import { render, screen } from "@testing-library/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Clerk from "./index";

// Mock the required components
jest.mock("@clerk/nextjs", () => ({
  SignedIn: jest.fn(({ children }) => <>{children}</>),
  SignedOut: jest.fn(({ children }) => <>{children}</>),
  UserButton: jest.fn(() => <button>User</button>),
}));

jest.mock("../Button", () => ({
  __esModule: true,
  default: (props: { children: React.ReactNode; asChild?: boolean }) => (
    <div>{props.children}</div>
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: (props: { href: string; children: React.ReactNode }) => (
    <a href={props.href}>{props.children}</a>
  ),
}));

describe("Clerk Component", () => {
  it("renders Sign In and Get Started links when signed out", () => {
    (SignedOut as jest.Mock).mockImplementation(({ children }) => (
      <>{children}</>
    ));
    (SignedIn as jest.Mock).mockImplementation(() => null);

    render(<Clerk />);

    expect(screen.getByText("Sign In")).toBeTruthy();
    expect(screen.getByText("Get Started")).toBeTruthy();
  });

  it("renders Dashboard link and UserButton when signed in", () => {
    (SignedIn as jest.Mock).mockImplementation(({ children }) => (
      <>{children}</>
    ));
    (SignedOut as jest.Mock).mockImplementation(() => null);

    render(<Clerk />);

    expect(screen.getByText("Dashboard")).toBeTruthy();
    expect(screen.getByText("User")).toBeTruthy();
  });
});
