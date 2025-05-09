import { Alert } from "react-native";
import { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LiveCameraScreen from "./screen/LiveCameraScreen";
import { EventSourcePolyfill } from "event-source-polyfill";

const Stack = createNativeStackNavigator();

export default function App() {
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LiveCamera" component={LiveCameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
