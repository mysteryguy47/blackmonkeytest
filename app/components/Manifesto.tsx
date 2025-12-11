import { useEffect, useRef, useState } from "react";

export function Manifesto() {
  const [isVisible, setIsVisible] = useState(false);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (manifestoRef.current) {
      observer.observe(manifestoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={manifestoRef}
      className="font-tech relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="manifesto"
    >
      {/* Angular bracket decorations */}
      <div className="absolute top-20 left-5 text-primary/30 font-mono text-7xl select-none pointer-events-none">
        {"<"}
      </div>
      <div className="absolute bottom-20 right-5 text-primary/30 font-mono text-7xl select-none pointer-events-none">
        {"/>"}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="space-y-0">
          {/* Title */}
          <div 
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
          </div>


          <div className="absolute bottom-1/4 right-0 text-[12rem] font-tech font-bold text-foreground/[0.08] select-none pointer-events-none translate-y-[-2rem]">
        NEXT
      </div>
      <div className="absolute bottom-1/4 right-12 text-[13rem] font-tech font-bold text-foreground/[0.08] select-none pointer-events-none translate-y-[9rem]">
        GEN
      </div>



          {/* Manifesto Text */}
          <div className="space-y-8" data-testid="text-manifesto">
            <div 
              className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="font-brutalist font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-foreground">
                WE DON'T TEACH
              </p>
              <p className="font-brutalist font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                STEM.
              </p>
            </div>

            <div 
              className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="font-brutalist font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-foreground">
                WE BUILD
              </p>
              <p className="font-brutalist font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                CREATORS.
              </p>
            </div>

            <div 
              className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="font-mono  text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl leading-relaxed border-l-4 border-primary/50 pl-6 py-4">
                Every circuit. Every kit. Every challenge. <br />
                Built with one promise: <br />
                Kids won’t just understand the world — <br />
                They’ll shape it.
              </p>
            </div>

            <div 
              className={`transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <p className="font-brutalist font-bold text-3xl sm:text-4xl md:text-5xl text-foreground uppercase">
                ZERO COMPROMISE.
              </p>
              <p className="font-brutalist font-bold text-3xl sm:text-4xl md:text-5xl text-primary uppercase">
                MAXIMUM IMPACT.
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}