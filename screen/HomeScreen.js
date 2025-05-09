import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import HiveCard from "../components/HiveCard";
import { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

// Sample data for the beehives
const hives = [
  { id: "1", number: 1, status: "Normal", location: "North corner" },
  { id: "2", number: 2, status: "Wasp detected", location: "East side" },
  { id: "3", number: 3, status: "Normal", location: "South entrance" },
  { id: "4", number: 4, status: "Normal", location: "West fence" },
  { id: "5", number: 5, status: "Normal", location: "Center garden" },
  { id: "6", number: 6, status: "Normal", location: "Orchard edge" },
];

export default function HomeScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      "https://calf-exact-anteater.ngrok-free.app/detect",
      { heartbeatTimeout: 30000 }
    );

    eventSource.onopen = function () {
      console.log("SSE 연결 성공");
      setError("");
    };

    eventSource.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        const newNotification = {
          id: Date.now().toString(),
          message: eventData.message,
        };
        setMessages((prevMessages) => [...prevMessages, newNotification]);

        if (eventData.message.toLowerCase().includes("detected")) {
          Alert.alert("⚠️ 말벌 감지", eventData.message, [{ text: "확인" }]);
        }
      } catch (err) {
        console.warn("데이터 파싱 실패, err");
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE 에러:", err);
      setError("연결에 문제 발생");

      eventSource.close();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Text style={styles.title}>🐝 벌통 모니터</Text>
      </View>
      <FlatList
        data={hives}
        renderItem={({ item }) => (
          <HiveCard
            hive={item}
            onPressCamera={() =>
              navigation.navigate("LiveCamera", { hiveNumber: item.number })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  listContent: {
    padding: 16,
  },
});
