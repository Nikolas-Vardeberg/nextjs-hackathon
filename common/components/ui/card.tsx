import clsx from "clsx";
import * as React from "react"


type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
}

/**
 * Card Component
 * @description: Reusable card component
 */
function Card({
  className,
  ...props
}: CardProps) {
  return <div className={clsx("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
}

type CardHeaderProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  className?: string;
}

/**
 * Card Header Component
 * @description: Reusable card header component
 */
function CardHeader({
  className,
  ...props
}: CardHeaderProps) {
  return <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

type CardTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
}

/**
 * Card Title Component
 * @description: Reusable card title component
 */
function CardTitle({
  className,
  ...props
}: CardTitleProps) {
  return <div className={clsx("font-normal leading-none tracking-tight", className)} {...props} />
}

type CardDescriptionProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  className?: string;
}

/**
 * Card Description Component
 * @description: Reusable card description component
 */
function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return <div  className={clsx("text-sm text-muted-foreground", className)} {...props} />
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
}

/**
 * Card Content Component
 * @description: Reusable card content component
 */
function CardContent({
  className,
  ...props
}: CardContentProps) {
  return <div className={clsx("p-6 pt-0", className)} {...props} />
}

type CardFooterProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  className?: string;
}

/**
 * Card Footer Component
 * @description: Reusable card footer component
 */
function CardFooter({
  className,
  ...props
}: CardFooterProps) {
  return <div className={clsx("flex items-center p-6 pt-0", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }