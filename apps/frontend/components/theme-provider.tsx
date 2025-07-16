//apps/frontend/components/theme-provider.tsx
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { Platform } from 'react-native';

import { NAV_THEME, useColorScheme } from '@kando/ui';


const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};


export function AppThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const theme = await AsyncStorage.getItem('theme');

            if (Platform.OS === 'web') {
                if (typeof document !== 'undefined') {
                    // Adds the background color to the html element to prevent white background on overscroll.
                    /* eslint-disable-next-line no-undef */
                    document.documentElement.classList.add('bg-background');
                }
            }

            if (!theme) {
                await AsyncStorage.setItem('theme', colorScheme);
                setIsColorSchemeLoaded(true);
                return;
            }

            const colorTheme = theme === 'dark' ? 'dark' : 'light';

            if (colorTheme !== colorScheme) {
                setColorScheme(colorTheme);

                setIsColorSchemeLoaded(true);
                return;
            }

            setIsColorSchemeLoaded(true);
        })().finally(() => {
            SplashScreen.hideAsync();
        });
    }, []);

    useEffect(() => {
        (async () => {
            // Save color scheme changes to AsyncStorage
            await AsyncStorage.setItem('theme', colorScheme);
        })();
    }, [colorScheme]);

    if (!isColorSchemeLoaded) {
        return null;
    }
    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            {children}
        </ThemeProvider>
    );
}