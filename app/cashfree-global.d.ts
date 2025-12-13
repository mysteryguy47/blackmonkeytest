// global.d.ts   (or types/cashfree.d.ts)
export {};

declare global {
  interface Window {
    Cashfree: (config: { mode: "production" | "sandbox" }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: "_self" | "_blank";
      }) => void;
    };
  }
}
