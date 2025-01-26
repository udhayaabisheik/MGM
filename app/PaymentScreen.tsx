import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Linking } from "react-native";

const PaymentScreen = () => {
  const cardIconScale = useSharedValue(1);

  const handleCardFocus = () => {
    cardIconScale.value = withTiming(1.5, { duration: 300 });
  };

  const handleCardBlur = () => {
    cardIconScale.value = withTiming(1, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardIconScale.value }],
  }));

  const handleUPIPayment = () => {
    const upiUrl = `upi://pay?pa=merchant@upi&pn=MerchantName&mc=1234&tid=txn12345&tr=orderRef123&tn=Payment%20for%20order&am=500.00&cu=INR`;
    Linking.canOpenURL(upiUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(upiUrl);
        } else {
          Alert.alert("Error", "No UPI apps installed on this device.");
        }
      })
      .catch(() => {
        Alert.alert("Error", "Unable to initiate UPI payment.");
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Make a Payment</Text>

      {/* Card Payment Section */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionHeader}>Card Payment</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cardholder Name</Text>
          <View style={styles.inputWithIcon}>
            <TextInput style={styles.input} placeholder="Enter your name" />
            <Icon
              name="account"
              size={24}
              color="#6A0DAD"
              style={styles.icon}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Number</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={styles.input}
              placeholder="Enter card number"
              keyboardType="numeric"
              onFocus={handleCardFocus}
              onBlur={handleCardBlur}
            />
            <Animated.View style={[animatedStyle]}>
              <Icon name="credit-card-outline" size={24} color="#6A0DAD" />
            </Animated.View>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton}>
          <Icon
            name="credit-card-check"
            size={24}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Pay with Card</Text>
        </TouchableOpacity>
      </View>

      {/* UPI Payment Section */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionHeader}>UPI Payment</Text>
        <TouchableOpacity style={styles.upiButton} onPress={handleUPIPayment}>
          <Icon
            name="cellphone"
            size={24}
            color="#fff"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Pay with UPI</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EDE7F6", // Light purple background
    padding: 20,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  paymentSection: {
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  payButton: {
    backgroundColor: "#6A0DAD",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  upiButton: {
    backgroundColor: "#6A0DAD",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default PaymentScreen;
