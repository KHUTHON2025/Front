import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
  Modal,
  TouchableOpacity,
} from "react-native";
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
  const [detectDetected, setDetectDetected] = useState(false);
  const [voiceDetected, setVoiceDetected] = useState(false);

  const checkBothDetected = () => {
    if (detectDetected && voiceDetected) {
      setModalMessage("⚠️ 말벌 감지됨 (영상 + 음성)");
      setModalVisible(true);
      setDetectDetected(false);
      setVoiceDetected(false);
    }
  };

  useEffect(() => {
    // 1. 영상 기반 감지
    const detectSource = new EventSourcePolyfill(
      "https://calf-exact-anteater.ngrok-free.app/detect",
      { heartbeatTimeout: 30000 }
    );

    detectSource.onmessage = (event) => {
      try {
        const eventData = event.data.toString().toLowerCase(); // 문자열로 받음
        console.log("📡 수신:", eventData);

        const words = eventData.split(": ");
        const number = words[0].charAt(words[0].length - 1);

        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), message: eventData },
        ]);

        // 감지 메시지 확인
        if (eventData[1] === "detected") {
          setModalMessage("⚠️ " + number + "번 벌통 말벌 감지"); // 문자열 1개만 필요
          setModalVisible(true);
        }
      } catch (err) {
        console.warn("⚠️ 데이터 파싱 실패:", err);
      }
    };

    detectSource.onerror = (err) => {
      console.error("❌ 영상 SSE 에러:", err);
      detectSource.close();
    };
  }, []);

  useEffect(() => {
    if (detectDetected) {
      const getVoiceSource = async () => {
        try {
          const res = await fetch(
            "https://actually-live-fly.ngrok-free.app/voice"
          );
          const data = await res.json();

          if (data.status === "detected") {
            setVoiceDetected(true);
          }
        } catch {
          console.error("❌ 음성 SSE 에러:", err);
        }
      };
    }
  }, [detectDetected]);

  useEffect(() => {
    checkBothDetected();
  }, [detectDetected, voiceDetected]);

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
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
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
    fontSize: 24,
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
