import { StyleSheet, View, Text, TouchableOpacity } from "react-native"

export default function HiveCard({ hive, onPressCamera }) {
  const isWaspDetected = hive.status === "Wasp detected"

  return (
    <View style={[styles.card, isWaspDetected ? styles.alertCard : styles.normalCard]}>
      <View style={styles.cardHeader}>
        <Text style={styles.hiveNumber}>벌통 {hive.number}</Text>
        <Text style={[styles.status, isWaspDetected ? styles.alertStatus : styles.normalStatus]}>
          {isWaspDetected ? "⚠️ 말벌 감지" : "이상 없음"}
        </Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>위치:</Text>
        <Text style={styles.locationText}>{hive.location}</Text>
      </View>

      {isWaspDetected && (
        <TouchableOpacity style={styles.cameraButton} onPress={onPressCamera}>
          <Text style={styles.cameraButtonText}>실시간 카메라 확인</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  normalCard: {
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 4,
    borderLeftColor: "#ffc229",
  },
  alertCard: {
    backgroundColor: "#FFEBEE",
    borderLeftWidth: 4,
    borderLeftColor: "#FF0000",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  hiveNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  normalStatus: {
    color: "#4CAF50",
  },
  alertStatus: {
    color: "#FF0000",
  },
  locationContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  locationLabel: {
    fontSize: 14,
    color: "#757575",
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#000000",
  },
  cameraButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  cameraButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
})