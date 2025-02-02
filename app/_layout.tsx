import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NotificationProvider } from "@/context/NotificationContext";
import * as Notifications from "expo-notifications";
import { StatusBar, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Example logic to check if the user is authenticated
  useEffect(() => {
    const userLoggedIn = false; // Replace this with your actual login logic
    setIsAuthenticated(userLoggedIn);
  }, []);

  if (!loaded) {
    return null; // Prevent rendering until fonts are loaded
  }

  return (
    <NotificationProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false, // Hide the header globally for all screens
          }}
        >
          {isAuthenticated ? (
            // The TabLayout will be mapped automatically under /tabs
            <Stack.Screen name="(tabs)" />
          ) : (
            // Show login screen if not authenticated
            <Stack.Screen name="LoginScreen" />
          )}
          <Stack.Screen name="SignUpScreen" />
          <Stack.Screen
            name="SupportScreen"
            options={{
              headerTitle: "Support",
              headerShown: true,
              headerBackground: () => (
                <View style={{ flex: 1, backgroundColor: "white" }} />
              ),
              headerTitleStyle: { color: "black" },
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="EditProfileScreen"
            options={{
              headerTitle: "Edit Profile",
              headerShown: true,
              headerBackground: () => (
                <View style={{ flex: 1, backgroundColor: "white" }} />
              ),
              headerTitleStyle: { color: "black" },
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="NotificationScreen"
            options={{
              headerTitle: "Notifications",
              headerShown: true,
              headerBackground: () => (
                <View style={{ flex: 1, backgroundColor: "white" }} />
              ),
              headerTitleStyle: { color: "black" },
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="DietDetailsScreen"
            options={{
              headerTitle: "Diet Deatils",
              headerShown: true,
              headerBackground: () => (
                <View style={{ flex: 1, backgroundColor: "white" }} />
              ),
              headerTitleStyle: { color: "black" },
              headerTintColor: "black",
            }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="PaymentScreen" />
        </Stack>
        <StatusBar backgroundColor="#6A0DAD" barStyle="light-content" />
      </ThemeProvider>
    </NotificationProvider>
  );
}
