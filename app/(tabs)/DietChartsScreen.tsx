import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

interface DietChart {
  id: number;
  title: string;
  description: string;
  meals: string;
}

const DietChartsScreen = () => {
  const [dietCharts, setDietCharts] = useState<DietChart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch diet data from the API
    const fetchDietCharts = async () => {
      try {
        const response = await fetch("http://192.168.0.101:8080/diets");
        const data = await response.json();
        setDietCharts(data);
      } catch (error) {
        console.error("Error fetching diet charts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDietCharts();
  }, []);

  const renderItem = ({ item }: { item: DietChart }) => (
    <View style={styles.dietCard}>
      <Text style={styles.dietTitle}>{item.title}</Text>
      <Text style={styles.dietDescription}>{item.description}</Text>
      <Text style={styles.mealTimings}>Meals: {item.meals}</Text>
      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() =>
          router.push({
            pathname: "/DietDetailsScreen",
            params: {
              dietChartId: item.id, // Pass dietChartId instead of id
            },
          })
        }
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6A1B9A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dietCharts}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE7F6",
    padding: 10,
    paddingTop: StatusBar.currentHeight,
  },
  dietCard: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dietTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dietDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  mealTimings: {
    fontSize: 14,
    color: "#888",
  },
  viewDetailsButton: {
    marginTop: 10,
    backgroundColor: "#6A1B9A",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  viewDetailsText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DietChartsScreen;
