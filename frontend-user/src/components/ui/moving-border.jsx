"use client";
import React from "react";

export const Button = ({
  children,
  className,
  containerClassName,
  borderRadius = "1.75rem",
  as: Component = "button",
  duration,
  ...otherProps
}) => {
  return (
    <Component
      className={`relative inline-flex overflow-hidden p-[1px] ${containerClassName}`}
      style={{
        borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-[-1000%] animate-[moving-border_1s_linear_infinite]"
        style={{
          background: `conic-gradient(from var(--moving-border-angle), transparent 20%, #fff 50%, transparent 80%)`,
        }}
      />
      <div
        className={`relative inline-flex h-full w-full cursor-pointer items-center justify-center text-sm font-medium backdrop-blur-3xl ${className}`}
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};
