import { AppThemeProvider } from '~/components/theme-provider';
import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <AppThemeProvider>
      <Stack />
    </AppThemeProvider>
  );
}
