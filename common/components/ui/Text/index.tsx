import classNames from "classnames";
import styles from "./style.module.css";

const Title: React.FC<{ title: string; className?: string }> = ({
  title,
  className,
}) => {
  return <h1 className={classNames(styles.text, className)}>{title}</h1>;
};

export default Title;
