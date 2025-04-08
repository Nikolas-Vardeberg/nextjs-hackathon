import classNames from "classnames";
const Title: React.FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => {
  return <h1 className={classNames("text-title", className)}>{title}</h1>;
};

export default Title;
