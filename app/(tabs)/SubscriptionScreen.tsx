import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  SubscriptionScreen: undefined;
  PaymentScreen: undefined;
};

const SubscriptionScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "SubscriptionScreen">
    >();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar backgroundColor="#6A0DAD" barStyle="light-content" />
      <Animated.View style={styles.container}>
        <Text style={styles.header}>Choose Your Plan</Text>

        <View style={styles.cardContainer}>
          {/* Basic Plan */}
          <View style={styles.card}>
            <Icon
              name="user"
              size={50}
              color="#6A0DAD"
              style={styles.cardIcon}
            />
            <Text style={styles.planTitle}>Basic Plan</Text>
            <Text style={styles.planPrice}>$20/month</Text>
            <Text style={styles.planDetails}>
              Access to gym equipment, group classes
            </Text>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => navigation.navigate("PaymentScreen")}
            >
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          {/* Premium Plan */}
          <View style={styles.card}>
            <Icon
              name="diamond"
              size={50}
              color="#6A0DAD"
              style={styles.cardIcon}
            />
            <Text style={styles.planTitle}>Premium Plan</Text>
            <Text style={styles.planPrice}>$40/month</Text>
            <Text style={styles.planDetails}>
              All Basic Plan features + Personal Trainer
            </Text>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => navigation.navigate("PaymentScreen")}
            >
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>

          {/* Ultimate Plan */}
          <View style={styles.card}>
            <Icon
              name="star"
              size={50}
              color="#6A0DAD"
              style={styles.cardIcon}
            />
            <Text style={styles.planTitle}>Ultimate Plan</Text>
            <Text style={styles.planPrice}>$60/month</Text>
            <Text style={styles.planDetails}>
              All Premium Plan features + VIP Access
            </Text>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => navigation.navigate("PaymentScreen")}
            >
              <Text style={styles.buttonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EDE7F6", // Light purple background
    paddingVertical: 20,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#6A0DAD", // Purple color for the header
    textAlign: "center",
  },
  cardContainer: {
    width: "90%",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF", // White background for cards
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 15,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A0DAD", // Purple text
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 18,
    color: "#6A0DAD", // Purple color for price
    marginBottom: 10,
  },
  planDetails: {
    fontSize: 14,
    color: "#7F8C8D", // Subtle gray text
    textAlign: "center",
    marginBottom: 15,
  },
  subscribeButton: {
    backgroundColor: "#6A0DAD", // Purple button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF", // White text
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SubscriptionScreen;
