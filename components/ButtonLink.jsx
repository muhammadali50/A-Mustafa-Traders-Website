import Link from "next/link";

const variants = { primary: "btn-primary", light: "btn-light", outline: "btn-outline" };

// Shared CTA: one look for every navigation button on the site (see `.btn` in globals.css).
export default function ButtonLink({ href, variant = "primary", arrow = false, className = "", children, ...props }) {
  const classes = `btn ${variants[variant]}${arrow ? " btn-arrow" : ""}${className ? ` ${className}` : ""}`;
  return <Link href={href} className={classes} {...props}>{children}</Link>;
}
