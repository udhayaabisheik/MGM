import React, { useState } from "react";
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
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState<
    "Google Pay" | "PhonePe" | "Paytm" | "UPI ID" | null
  >(null);
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");

  const handlePayment = (
    method: "Google Pay" | "PhonePe" | "Paytm" | "UPI ID"
  ) => {
    let upiUrl = "";
    if (method === "Google Pay") {
      upiUrl =
        "tez://upi/pay?pa=merchant@upi&pn=Merchant&am=500&cu=INR&tn=Payment";
    } else if (method === "PhonePe") {
      upiUrl =
        "phonepe://pay?pa=merchant@upi&pn=Merchant&am=500&cu=INR&tn=Payment";
    } else if (method === "Paytm") {
      upiUrl =
        "paytmmp://pay?pa=merchant@upi&pn=Merchant&am=500&cu=INR&tn=Payment";
    } else if (method === "UPI ID" && upiId) {
      upiUrl = `upi://pay?pa=${upiId}&pn=Merchant&am=500&cu=INR&tn=Payment`;
    }

    if (upiUrl) {
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
    }
  };

  const handleVerifyAndPay = () => {
    // Basic UPI ID validation
    const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (upiPattern.test(upiId)) {
      setUpiError("");
      handlePayment("UPI ID");
    } else {
      setUpiError("UPI ID is invalid. Please enter a valid UPI ID.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#6A0DAD" barStyle="light-content" />
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={28} color="#6A0DAD" />
      </TouchableOpacity>
      <Text style={styles.header}>Make a Payment</Text>

      {/* Payment Options Section */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionHeader}>Select Payment Method</Text>
        <View style={styles.radioContainer}>
          {["Google Pay", "PhonePe", "Paytm", "UPI ID"].map((method) => (
            <View key={method}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() =>
                  setSelectedPayment(
                    method as "Google Pay" | "PhonePe" | "Paytm" | "UPI ID"
                  )
                }
              >
                <Icon
                  name={
                    method === "Google Pay"
                      ? "google"
                      : method === "PhonePe"
                      ? "cellphone"
                      : method === "Paytm"
                      ? "wallet"
                      : "account"
                  }
                  size={24}
                  color="#6A0DAD"
                />
                <Text style={styles.radioText}>{method}</Text>
              </TouchableOpacity>

              {/* Display Pay Button only for selected method */}
              {selectedPayment === method && (
                <View style={styles.paymentDetails}>
                  {method === "UPI ID" && (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter UPI ID"
                        value={upiId}
                        onChangeText={(text) => {
                          setUpiId(text);
                          setUpiError("");
                        }}
                      />
                      {upiError ? (
                        <Text style={styles.errorText}>{upiError}</Text>
                      ) : null}
                      <TouchableOpacity
                        style={styles.payButton}
                        onPress={handleVerifyAndPay}
                      >
                        <Text style={styles.buttonText}>Verify & Pay ₹500</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {method !== "UPI ID" && (
                    <TouchableOpacity
                      style={styles.payButton}
                      onPress={() => handlePayment(method)}
                    >
                      <Text style={styles.buttonText}>
                        Pay with {method} - ₹500
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EDE7F6",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
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
  radioContainer: {
    flexDirection: "column",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  paymentDetails: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
