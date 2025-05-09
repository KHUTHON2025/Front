"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function LiveCameraScreen({ route, navigation }) {
  const { hiveNumber } = route.params
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update the timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString()
  const formattedDate = currentTime.toLocaleDateString()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFCC00" />
        </TouchableOpacity>
        <Text style={styles.title}>벌통 {hiveNumber} - Live Camera</Text>
      </View>

      <View style={styles.videoContainer}>
        {/* Placeholder for video feed */}
        <View style={styles.videoFeed}>
          <Image
            source={{ uri: "https://via.placeholder.com/350x250/000000/FFCC00?text=Live+Camera+Feed" }}
            style={styles.videoPlaceholder}
            resizeMode="cover"
          />
        </View>

        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>
            {formattedDate} | {formattedTime}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>벌통 {hiveNumber} 말벌 활동 감지중...</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000000",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFCC00",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  videoFeed: {
    width: "100%",
    height: "70%",
    backgroundColor: "#333333",
    borderRadius: 8,
    overflow: "hidden",
  },
  videoPlaceholder: {
    width: "100%",
    height: "100%",
  },
  timestampContainer: {
    marginTop: 16,
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 4,
  },
  timestamp: {
    color: "#FFCC00",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#000000",
  },
  infoText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
})