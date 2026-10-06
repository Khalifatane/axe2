'use client';

import Script from 'next/script';

export default function PrelineScript() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/preline@2.5.0/dist/preline.js"
      onLoad={() => {
        const prelineWindow = window as Window & {
          HSStaticMethods?: { autoInit: () => void };
        };

        prelineWindow.HSStaticMethods?.autoInit();
      }}
    />
  );
}
