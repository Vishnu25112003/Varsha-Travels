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
      className={`relative inline-flex overflow-hidden p-[2px] ${containerClassName}`}
      style={{
        borderRadius,
        filter: 'drop-shadow(0 0 4px rgba(235, 51, 56, 0.3))',
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-[-1000%] animate-[moving-border_1s_linear_infinite]"
        style={{
          background: `conic-gradient(from var(--moving-border-angle), transparent 10%, #eb3338 25%, #eb3338 75%, transparent 90%)`,
        }}
      />
      <div
        className={`relative inline-flex h-full w-full cursor-pointer items-center justify-center text-sm font-medium backdrop-blur-3xl ${className}`}
        style={{
          borderRadius: `calc(${borderRadius} - 2px)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};
