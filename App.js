import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ActivityIndicator, ScrollView, StyleSheet, Alert, Platform, Modal, TouchableOpacity } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import LiveCameraScreen from "./screen/LiveCameraScreen";
import { EventSourcePolyfill } from "event-source-polyfill";

const Stack = createNativeStackNavigator();

export default function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
  <>
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
    <Modal
    transparent
    animationType="fade"
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.modalText}>{modalMessage}</Text>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
