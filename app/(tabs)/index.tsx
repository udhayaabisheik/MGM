import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function HomeScreen() {
  const username = "Abisheik";
  const plan = "Premium Plan";
  const status = "Active";
  const sessionsUsed = 10;
  const totalSessions = 20;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#6A0DAD" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Hi {username} 👋</Text>
        </View>

        {/* Subscription Card */}
        <View style={styles.subscriptionCard}>
          <Text style={styles.planName}>{plan}</Text>
          <Text style={styles.planStatus}>{status}</Text>
          <Text style={styles.usageText}>
            {sessionsUsed} of {totalSessions} sessions used
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Upgrade Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonTextOutline}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promotions Section */}
        <View style={styles.promotionsSection}>
          <Text style={styles.promotionsTitle}>Exclusive Offers</Text>
          <View style={styles.promotionCard}>
            <Text style={styles.promotionText}>
              Get 20% off on yearly plans!
            </Text>
          </View>
          <View style={styles.promotionCard}>
            <Text style={styles.promotionText}>
              Refer a friend and earn rewards!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: "#EDE7F6",
    flexGrow: 1,
  },
  greetingSection: {
    padding: 20,
    backgroundColor: "#6A0DAD",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: -10,
    marginRight: -10,
    marginTop: 20,
    paddingBottom: 30,
  },
  greetingText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  subscriptionCard: {
    backgroundColor: "#fff",
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  planStatus: {
    fontSize: 16,
    color: "#4CAF50",
    marginVertical: 5,
  },
  usageText: {
    fontSize: 14,
    color: "#888",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#6A0DAD",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#6A0DAD",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonTextOutline: {
    color: "#6A0DAD",
    textAlign: "center",
    fontWeight: "bold",
  },
  promotionsSection: {
    marginTop: 20,
  },
  promotionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  promotionCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  promotionText: {
    fontSize: 14,
    color: "#333",
  },
});
