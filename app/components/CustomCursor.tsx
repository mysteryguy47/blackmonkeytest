"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SENSITIVITY = {
  slow: { damping: 40, stiffness: 80 },
  normal: { damping: 25, stiffness: 150 },
  fast: { damping: 15, stiffness: 250 },
};

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorX = useSpring(0, { ...SENSITIVITY.fast, mass: 0.5 });
  const cursorY = useSpring(0, { ...SENSITIVITY.fast, mass: 0.5 });

  const dotX = useSpring(0, { ...SENSITIVITY.fast, stiffness: 900, mass: 0.1 });
  const dotY = useSpring(0, { ...SENSITIVITY.fast, stiffness: 900, mass: 0.1 });


  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 2);
      dotY.set(e.clientY - 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  const variants = {
    default: {
      width: 32,
      height: 32,
    },
    hover: {
      width: 48,
      height: 48,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-neon-purple rounded-full pointer-events-none z-[99999] mix-blend-difference hidden md:block"
        variants={variants}
        animate={cursorVariant}
        style={{
          left: cursorX,
          top: cursorY,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 250,
          mass: 0.3,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-neon-cyan rounded-full pointer-events-none z-[999999] mix-blend-difference hidden md:block"
        style={{
          left: dotX,
          top: dotY,
        }}
      />
    </>
  );
}

// import { useEffect, useRef, useState } from "react";
// import { motion, useSpring } from "framer-motion";

// const SENSITIVITY = {
//   ring: { damping: 20, stiffness: 200, mass: 0.5 },
//   dot: { damping: 20, stiffness: 200, mass: 0.2 },
// };

// export function CustomCursor() {
//   const CURSOR_COLOR = "#c59915ff"

//   const ringX = useSpring(0, SENSITIVITY.ring);
//   const ringY = useSpring(0, SENSITIVITY.ring);

//   const dotX = useSpring(0, SENSITIVITY.dot);
//   const dotY = useSpring(0, SENSITIVITY.dot);

//   const [isMagnetic, setIsMagnetic] = useState(false);
//   const [cursorVariant, setCursorVariant] = useState("default");

//   const mousePos = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const move = (e: MouseEvent) => {
//       let { clientX, clientY } = e;
//       mousePos.current = { x: clientX, y: clientY };

//       let mx = clientX;
//       let my = clientY;

//       const target = e.target as HTMLElement;
//       const interactive = target.closest("button, a, [role='button']");

//       if (interactive) {
//         setCursorVariant("hover");
//         setIsMagnetic(true);

//         const rect = interactive.getBoundingClientRect();
//         const cx = rect.left + rect.width / 2;
//         const cy = rect.top + rect.height / 2;

//         const dx = mx - cx;
//         const dy = my - cy;
//         const distance = Math.sqrt(dx * dx + dy * dy);

//         if (distance < 80) {
//           const pull = 0.3;
//           mx = mx - dx * pull;
//           my = my - dy * pull;
//         }
//       } else {
//         setCursorVariant("default");
//         setIsMagnetic(false);
//       }

//       ringX.set(mx - 16);
//       ringY.set(my - 16);

//       dotX.set(mx - 2);
//       dotY.set(my - 2);
//     };

//     const show = () => {
//       document.body.classList.remove("cursor-hidden");
//     };

//     const hide = () => {
//       document.body.classList.add("cursor-hidden");
//     };

//     window.addEventListener("mousemove", move);
//     window.addEventListener("mouseenter", show);
//     window.addEventListener("mouseleave", hide);

//     return () => {
//       window.removeEventListener("mousemove", move);
//       window.removeEventListener("mouseenter", show);
//       window.removeEventListener("mouseleave", hide);
//     };
//   }, [ringX, ringY, dotX, dotY]);

//   const ringVariants = {
//     default: { width: 36, height: 36 },
//     hover: { width: 42, height: 42 },
//   };

//   return (
//     <>
//       {/* OUTER RING */}
//       <motion.div
//         className="fixed top-0 left-0 border-2 border-neon-purple rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
//         style={{ left: ringX, top: ringY, borderColor: CURSOR_COLOR}}
//         animate={cursorVariant}
//         variants={ringVariants}
//         transition={{ type: "spring", damping: 30, stiffness: 250 }}
//       />

//       {/* INNER DOT */}
//       <motion.div
//         className="fixed top-0 left-0 w-2 bg-neon-cyan h-2 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
//         style={{
//           left: dotX,
//           top: dotY,
//           backgroundColor: CURSOR_COLOR,   // <— add this
//           scale: isMagnetic ? 1.5 : 1,
//         }}
//       />
//     </>
//   );
// }
