// global.d.ts   (or types/cashfree.d.ts)
export {};

declare global {
  interface Window {
    Cashfree: any;  // or more specific type if you know
  }
}
