import { Alert } from "react-native";
import { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LiveCameraScreen from "./screen/LiveCameraScreen";
import { EventSourcePolyfill } from "event-source-polyfill";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const sse = new EventSource('http://YOUR_FASTAPI_SERVER_IP:8000/events'); 

    sse.addEventListener('message', event => {
      console.log("🐝 말벌 감지 메시지:", event.data);
      Alert.alert("⚠️ 말벌 감지", event.data);
    });

    sse.onerror = (err) => {
      console.error("❌ SSE 오류 발생:", err);
    };

    return () => {
      sse.close();
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
