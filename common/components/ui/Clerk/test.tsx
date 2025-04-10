import { render, screen } from "@testing-library/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Clerk from "./index";

jest.mock("@clerk/nextjs", () => ({
  SignedIn: jest.fn(({ children }) => <>{children}</>),
  SignedOut: jest.fn(({ children }) => <>{children}</>),
  SignInButton: jest.fn(() => <button>Sign In</button>),
  SignUpButton: jest.fn(() => <button>Sign Up</button>),
  UserButton: jest.fn(() => <button>User</button>),
}));

describe("Clerk Component", () => {
  it("renders SignInButton and SignUpButton when signed out", () => {
    (SignedOut as jest.Mock).mockImplementation(({ children }) => (
      <>{children}</>
    ));
    (SignedIn as jest.Mock).mockImplementation(() => null);

    render(<Clerk />);

    expect(screen.getByText("Sign In")).toBeTruthy();
    expect(screen.getByText("Sign Up")).toBeTruthy();
  });

  it("renders UserButton when signed in", () => {
    (SignedIn as jest.Mock).mockImplementation(({ children }) => (
      <>{children}</>
    ));
    (SignedOut as jest.Mock).mockImplementation(() => null);

    render(<Clerk />);

    expect(screen.getByText("User")).toBeTruthy();
  });
});
