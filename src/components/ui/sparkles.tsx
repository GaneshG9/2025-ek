"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export const SparklesCore = (props: {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const { theme } = useTheme();
  const {
    id,
    background,
    minSize,
    maxSize,
    particleDensity,
    className,
    particleColor,
  } = props;

  const [sparkles, setSparkles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
    }[]
  >([]);

  const [canvasVisible, setCanvasVisible] = useState(false);

  useEffect(() => {
    setCanvasVisible(true);
  }, []);

  useEffect(() => {
    if (!canvasVisible) return;

    const canvas = document.getElementById(id || "sparkles") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const setCanvasDimensions = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    const initSparkles = () => {
      const numParticles = particleDensity || 100;
      const newSparkles = Array.from({ length: numParticles }).map(() => {
        const size = (minSize || 0.2) + Math.random() * ((maxSize || 1) - (minSize || 0.2));
        const color = particleColor || (theme === "dark" ? "#FFFFFF" : "#000000");

        return {
          id: Math.random(),
          x: Math.random() * (canvas.width / dpr),
          y: Math.random() * (canvas.height / dpr),
          size: size,
          color: color,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        };
      });
      setSparkles(newSparkles);
    };

    initSparkles();

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const clientWidth = canvas.width / dpr;
      const clientHeight = canvas.height / dpr;

      sparkles.forEach((sparkle) => {
        sparkle.x += sparkle.vx;
        sparkle.y += sparkle.vy;

        // Wrap around logic
        if (sparkle.x < 0) sparkle.x = clientWidth;
        if (sparkle.x > clientWidth) sparkle.x = 0;
        if (sparkle.y < 0) sparkle.y = clientHeight;
        if (sparkle.y > clientHeight) sparkle.y = 0;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, 2 * Math.PI);
        ctx.fillStyle = particleColor || (theme === 'dark' ? '#FFFFFF' : '#000000');
        ctx.fill();
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [id, minSize, maxSize, particleDensity, particleColor, theme, canvasVisible]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {canvasVisible && <canvas
        id={id || "sparkles"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: background || "transparent",
        }}
      ></canvas>}
    </div>
  );
};
