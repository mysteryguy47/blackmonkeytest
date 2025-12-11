import { useCallback } from "react";

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export function useSound() {
  const play = useCallback((soundName: "hover" | "click" | "success" | "scroll") => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      switch (soundName) {
        case "hover":
          // Soft soothing hover sound
          const hoverOsc = ctx.createOscillator();
          const hoverGain = ctx.createGain();
          hoverOsc.type = "sine";
          hoverOsc.frequency.setValueAtTime(600, now);
          // hoverGain.gain.cancelScheduledValues(now);          // clear any previous ramps
          hoverGain.gain.setValueAtTime(0.08, now);
          hoverGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
          // Ensure connections are in place (safe to call repeatedly)
          hoverOsc.connect(hoverGain);
          hoverGain.connect(ctx.destination);
          hoverOsc.start(now);
          hoverOsc.stop(now + 0.03);
          break;

        // case "click":
        //   // Pleasant click sound
        //   const clickOsc = ctx.createOscillator();
        //   const clickGain = ctx.createGain();
        //   clickOsc.connect(clickGain);
        //   clickGain.connect(ctx.destination);
        //   const osc = ctx.createOscillator();
        //   osc.type = "square";

        //   // Pitch drops quickly from 800 → 400 Hz over 50 ms
        //   osc.frequency.setValueAtTime(800, now);
        //   osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

        //   // Connect to the shared reusable gain node
        //   osc.connect(clickGain);

        //   // Clean any previous automation + apply new envelope
        //   clickGain.gain.cancelScheduledValues(now);
        //   clickGain.gain.setValueAtTime(0.15, now);
        //   clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        //   osc.start(now);
        //   osc.stop(now + 0.05);

        //   // Optional: clean up when done
        //   osc.onended = () => osc.disconnect();
        //   break;



        case "click":
          // Thud
          const thud = ctx.createOscillator();
          const thudGain = ctx.createGain();
          thud.type = "sine";
          thud.frequency.setValueAtTime(150, now);
          thudGain.gain.setValueAtTime(0.15, now);
          thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          thud.connect(thudGain).connect(ctx.destination);
          thud.start(now);
          thud.stop(now + 0.05);

          // Click
          const click = ctx.createOscillator();
          const clickGain = ctx.createGain();
          click.type = "triangle";
          click.frequency.setValueAtTime(1200, now);
          click.frequency.exponentialRampToValueAtTime(600, now + 0.02);
          clickGain.gain.setValueAtTime(0.1, now);
          clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
          click.connect(clickGain).connect(ctx.destination);
          click.start(now);
          click.stop(now + 0.02);
          break;

        case "success":
          // Success chime
          const freqs = [523.25, 659.25, 783.99];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = "sine";
            osc.connect(gain);
            gain.connect(ctx.destination);
            const delay = now + idx * 0.08;
            gain.gain.setValueAtTime(0.06, delay);
            gain.gain.exponentialRampToValueAtTime(0.001, delay + 0.25);
            osc.start(delay);
            osc.stop(delay + 0.25);
          });
          break;

        case "scroll":
          // Smooth scroll sound
          const scrollOsc = ctx.createOscillator();
          const scrollGain = ctx.createGain();
          scrollOsc.frequency.value = 380;
          scrollOsc.type = "sine";
          scrollOsc.connect(scrollGain);
          scrollGain.connect(ctx.destination);
          scrollGain.gain.setValueAtTime(0.04, now);
          scrollGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          scrollOsc.start(now);
          scrollOsc.stop(now + 0.15);
          break;
      }
    } catch (e) {
      // Silently fail if audio context isn't available
    }
  }, []);

  return { play };
}


      // case "click":
      //   oscillator.frequency.setValueAtTime(800, now);
      //   oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      //   gainNode.gain.setValueAtTime(0.15, now);
      //   gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      //   oscillator.type = "square";
      //   oscillator.start(now);
      //   oscillator.stop(now + 0.05);
      //   break;
        
      // case "hover":
      //   oscillator.frequency.setValueAtTime(600, now);
      //   gainNode.gain.setValueAtTime(0.08, now);
      //   gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
      //   oscillator.type = "sine";
      //   oscillator.start(now);
      //   oscillator.stop(now + 0.03);
      //   break;
        
      // case "hover":
      //   oscillator.frequency.setValueAtTime(300, now);
      //   oscillator.frequency.linearRampToValueAtTime(600, now + 0.15);
      //   gainNode.gain.setValueAtTime(0.12, now);
      //   gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      //   oscillator.type = "sawtooth";
      //   oscillator.start(now);
      //   oscillator.stop(now + 0.15);
      //   break;
        
      // case "drop":
      //   oscillator.frequency.setValueAtTime(1200, now);
      //   oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);
      //   gainNode.gain.setValueAtTime(0.18, now);
      //   gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      //   oscillator.type = "triangle";
      //   oscillator.start(now);
      //   oscillator.stop(now + 0.3);
      //   break;