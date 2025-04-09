This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Storybook

Learn more about how the component library works with [storybook](https://storybook.js.org/docs/react/writing-stories/introduction).

- Components in the `app/_components` directory contain `story.ts` file that is used for component documentation.
- Start storybook by running `npm run storybook`

Example story.ts file

```ts
import type { Meta, StoryObj } from "@storybook/react";

import Title from ".";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Text/Title",
  component: Title,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    className: "",
    title: "Title goes here",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    title: "Title",
  },
};

export const Secondary: Story = {
  args: {
    title: "Title className",
    className: "xxl",
  },
};
```

## Testing

Testing is provided through [Jest](https://jestjs.io/docs/getting-started) by creating a test.tsx or test.ts file.

- To generate a coverage report run `npm run test:coverage`
- To run tests while coding run `npm run test:watch`

There are a number of utilities available through these libraries:

- [@testing-library/react](https://www.npmjs.com/package/@testing-library/react)
- [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)

Example test.tsx file

```tsx
import Test from "./index";
import { render } from "@testing-library/react";

describe("Title", () => {
  it("renders the title with custom class", () => {
    const { getByText } = render(<Test className="xl" title="Test Title" />);
    expect(getByText("Test Title").className).toBe("text-title xl");
  });
});
```

## Linting

[ESLint](https://eslint.org/): Ensures your JavaScript/TypeScript code is clean and follows best practices.

[Stylelint](https://stylelint.io/): Enforces consistent styles in your CSS/SCSS.

Run: `npm run lint`

## Husky

Git pre-checks are enabled. To skip the pre-checks add `--no-verify` to the end of your git command.

[Read husky docs here.](https://typicode.github.io/husky/)

These checks are ran again in the github actions, so skipping them will be visible in the build.

If the formatter doesnt work with vscode usually the secret is to restart vscode. You also need to make sure you have `esbenp.prettier-vscode` and `dbaeumer.vscode-eslint` extensions installed.

**If you are not familiar with git commands these are standard commands you can use:**

`git add .` - adds all the changes to the next commit
`git commit -m "my commit message goes here"` - commits the changes with lint and tests passing  
`git commit -m "my commit message goes here" --no-verify` - commits the changes but without lint and testing
`git push` - pushes up your changes

## ENV setup

Copy `.example.local` and rename it to `.env.local`
Update the file with the values. The same values must be in the Vercel app
