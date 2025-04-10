import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({
  children,
  className,
}: ContainerProps) => {
  return (
    <div className={clsx("container mx-auto px-8", className)}>{children}</div>
  );
};

export default Container;
