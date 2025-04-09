
import clsx from "clsx";
import { CardProps } from "./types";

export default function Card({ className, border, ...props }: CardProps) {
  return <div className={clsx(`rounded-xl ${border && "border"}`, className, )} {...props} />
}