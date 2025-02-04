import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";

// Define the root stack param list to match the params passed
type RootStackParamList = {
  DietDetailsScreen: {
    dietChartId: number;
  };
};

type RouteProps = RouteProp<RootStackParamList, "DietDetailsScreen">;

interface DietChart {
  id: number;
  title: string;
  description: string;
  meals: string;
}

const DietDetailsScreen = () => {
  // Use the route hook with the correct typing
  const route = useRoute<RouteProps>();
  const { dietChartId } = route.params;

  const [dietChart, setDietChart] = useState<DietChart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the diet chart details from the API based on the dietChartId
  useEffect(() => {
    fetch(`http://192.168.0.108:8080/diets/${dietChartId}`)
      .then((response) => response.json())
      .then((data) => {
        setDietChart(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching diet chart details:", error);
        setLoading(false);
      });
  }, [dietChartId]);

  // Show loading state while fetching
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A1B9A" />
        <Text>Loading diet chart details...</Text>
      </SafeAreaView>
    );
  }

  // Show error if no data found
  if (!dietChart) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Diet chart not found!</Text>
      </SafeAreaView>
    );
  }

  // Render the fetched diet chart details
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{dietChart.title}</Text>
      <Text style={styles.description}>{dietChart.description}</Text>
      <Text style={styles.mealsTitle}>Meals:</Text>
      <Text style={styles.meal}>
        {dietChart.meals || "No meals available."}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EDE7F6",
    paddingTop: StatusBar.currentHeight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  errorText: {
    fontSize: 18,
    color: "#D32F2F",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  mealsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  meal: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
});

export default DietDetailsScreen;
