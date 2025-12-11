// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
// }

// export function MagneticBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const particlesRef = useRef<Particle[]>([]);
//   const animationRef = useRef<number>();

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Set canvas size
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Initialize particles
//     const particleCount = 80;
//     particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
//       id: i,
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       vx: (Math.random() - 0.5) * 2,
//       vy: (Math.random() - 0.5) * 2,
//     }));

//     // Mouse move listener
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePos({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     // Animation loop
//     const animate = () => {
//       // Clear canvas with fade effect
//       ctx.fillStyle = "rgba(15, 15, 30, 0.1)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Update and draw particles
//       particlesRef.current.forEach((particle) => {
//         // Calculate distance to mouse
//         const dx = mousePos.x - particle.x;
//         const dy = mousePos.y - particle.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         const maxDistance = 200;

//         if (distance < maxDistance) {
//           // Magnetic attraction
//           const force = (1 - distance / maxDistance) * 0.3;
//           const angle = Math.atan2(dy, dx);
//           particle.vx = Math.cos(angle) * force * 3;
//           particle.vy = Math.sin(angle) * force * 3;
//         } else {
//           // Damping and slight random motion
//           particle.vx *= 0.97;
//           particle.vy *= 0.97;
//           particle.vx += (Math.random() - 0.5) * 0.2;
//           particle.vy += (Math.random() - 0.5) * 0.2;
//         }

//         // Update position
//         particle.x += particle.vx;
//         particle.y += particle.vy;

//         // Bounce off walls
//         if (particle.x < 0 || particle.x > canvas.width) {
//           particle.vx *= -1;
//           particle.x = Math.max(0, Math.min(canvas.width, particle.x));
//         }
//         if (particle.y < 0 || particle.y > canvas.height) {
//           particle.vy *= -1;
//           particle.y = Math.max(0, Math.min(canvas.height, particle.y));
//         }

//         // Draw particle
//         const distance2 = Math.sqrt(
//           (mousePos.x - particle.x) ** 2 + (mousePos.y - particle.y) ** 2
//         );
//         const proximity = Math.max(0, 1 - distance2 / maxDistance);

//         ctx.fillStyle = `rgba(168, 85, 247, ${0.3 + proximity * 0.5})`;
//         ctx.beginPath();
//         ctx.arc(particle.x, particle.y, 2 + proximity * 2, 0, Math.PI * 2);
//         ctx.fill();

//         // Draw connections
//         particlesRef.current.forEach((other) => {
//           const dx2 = other.x - particle.x;
//           const dy2 = other.y - particle.y;
//           const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

//           if (dist < 150) {
//             ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / 150) * 0.2})`;
//             ctx.lineWidth = 1;
//             ctx.beginPath();
//             ctx.moveTo(particle.x, particle.y);
//             ctx.lineTo(other.x, other.y);
//             ctx.stroke();
//           }
//         });
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       cancelAnimationFrame(animationRef.current!);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, [mousePos]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 pointer-events-none z-0"
//       style={{ background: "transparent" }}
//     />
//   );
// }
