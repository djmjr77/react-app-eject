// src/global.d.ts

declare global {
  interface Window {
    // Declare the classes/modules on Window
    // Mark it as optional (?) because it might not exist immediately when React mounts.
    EvtManager?: EventManager;
    spotConsoleLog?: any;
  }
}

// use an empty export {} line if we dont import/export anything else.
export {};