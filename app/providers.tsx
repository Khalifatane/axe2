'use client';

import type { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        {children}
      </SnackbarProvider>
    </RecoilRoot>
  );
}
