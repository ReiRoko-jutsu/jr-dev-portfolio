import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Detect mobile touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Smooth trailing effect
    let frameId: number;
    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      frameId = requestAnimationFrame(updateTrail);
    };

    const addHoverListeners = () => {
      const targets = document.querySelectorAll("a, button, [role='button'], .clickable");
      targets.forEach((target) => {
        target.addEventListener("mouseenter", () => setIsHovered(true));
        target.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    frameId = requestAnimationFrame(updateTrail);

    // Dynamic checks for dynamically added buttons
    const interval = setInterval(addHoverListeners, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(frameId);
      clearInterval(interval);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Target Dot */}
      <div
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.6 : isHovered ? 1.5 : 1})`,
        }}
      />
      {/* Sci-fi Outer Ring */}
      <div
        id="cursor-ring"
        className="fixed top-0 left-0 w-8 h-8 border-2 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-all duration-75"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          borderColor: isHovered ? "#22d3ee" : "rgba(34, 211, 238, 0.4)",
          transform: `translate(-50%, -50%) scale(${isClicked ? 1.4 : isHovered ? 1.8 : 1}) rotate(${isHovered ? "45deg" : "0deg"})`,
          borderStyle: isHovered ? "dashed" : "solid",
        }}
      />
      {/* Crosshair accents on hover */}
      {isHovered && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen text-[10px] font-mono text-cyan-400 select-none animate-pulse"
          style={{
            left: `${trail.x + 16}px`,
            top: `${trail.y - 12}px`,
          }}
        >
          AIM_ON
        </div>
      )}
    </>
  );
}
