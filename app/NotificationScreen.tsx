import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function NotificationScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation(); // Access navigation prop

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    // Load the notification setting from AsyncStorage when the component mounts
    const loadNotificationSetting = async () => {
      try {
        const storedSetting = await AsyncStorage.getItem(
          "notificationsEnabled"
        );
        if (storedSetting !== null) {
          setIsEnabled(JSON.parse(storedSetting)); // Parse and set the state from AsyncStorage
        }
      } catch (error) {
        console.error("Error loading notification setting:", error);
      }
    };

    loadNotificationSetting();
  }, []);

  // Save the notification setting to AsyncStorage whenever it changes
  useEffect(() => {
    const saveNotificationSetting = async () => {
      try {
        await AsyncStorage.setItem(
          "notificationsEnabled",
          JSON.stringify(isEnabled)
        );
      } catch (error) {
        console.error("Error saving notification setting:", error);
      }
    };

    saveNotificationSetting();
  }, [isEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6A0DAD" barStyle="light-content" />

      <Text style={styles.title}>Notification Settings</Text>

      <View style={styles.notificationOption}>
        <Text style={styles.optionText}>Enable Notifications</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isEnabled}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <Text style={styles.status}>
        Notifications are {isEnabled ? "Enabled" : "Disabled"}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  notificationOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    marginRight: 10,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "#6A1B9A",
  },
});
