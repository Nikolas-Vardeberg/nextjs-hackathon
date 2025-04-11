import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer";
};

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  as: Component = "div",
}: ContainerProps) => {
  return (
    <Component
      className={cn("container mx-auto px-4 sm:px-6 md:px-8", className)}
    >
      {children}
    </Component>
  );
};

export default Container;
