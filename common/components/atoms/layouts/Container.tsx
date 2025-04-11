import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({
  children,
  className,
}: ContainerProps) => {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 md:px-8", className)}>
      {children}
    </div>
  );
};

export default Container;
