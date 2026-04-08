import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import {
	focusManager,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AppState, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5,
						retry: 2,
					},
				},
			}),
	);

	useEffect(() => {
		const sub = AppState.addEventListener("change", (s) => {
			focusManager.setFocused(s === "active");
		});
		return () => sub.remove();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<GestureHandlerRootView>
					<AnimatedSplashOverlay />
					<AppTabs />
				</GestureHandlerRootView>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
