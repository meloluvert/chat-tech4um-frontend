"use client";

import { useState } from "react";
import Image from "next/image";

export function Avatar({
  src,
  alt,
  size = 40,
  color = "#1e1e1e",
  className = "",
}: {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
  color?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold ${className}`}
      >
        {alt[0].toUpperCase()}
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size }} className="relative">
      {!loaded && (
        <div
          className={`rounded-full bg-gray-200 animate-pulse absolute inset-0`}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`rounded-full object-cover transition-opacity ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
