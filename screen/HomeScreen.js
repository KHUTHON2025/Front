import { StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar } from "react-native"
import HiveCard from "../components/HiveCard"

// Sample data for the beehives
const hives = [
  { id: "1", number: 1, status: "Normal", location: "North corner" },
  { id: "2", number: 2, status: "Wasp detected", location: "East side" },
  { id: "3", number: 3, status: "Normal", location: "South entrance" },
  { id: "4", number: 4, status: "Normal", location: "West fence" },
  { id: "5", number: 5, status: "Normal", location: "Center garden" },
  { id: "6", number: 6, status: "Normal", location: "Orchard edge" },
]

export default function HomeScreen({ navigation }) {
  // const [hives, setHives] = useState([])

  // // 벌통 데이터 fetch
  // useEffect(() => {
  //   fetch("http://YOUR_FASTAPI_IP:8000/api/hives")
  //     .then((res) => res.json())
  //     .then((data) => setHives(data))
  //     .catch((err) => console.error("❌ 벌통 데이터 불러오기 실패:", err))
  // }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Text style={styles.title}>🐝 벌통 모니터</Text>
      </View>
      <FlatList
        data={hives}
        renderItem={({ item }) => (
          <HiveCard hive={item} onPressCamera={() => navigation.navigate("LiveCamera", { hiveNumber: item.number })} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fee599",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#595959",
  },
  listContent: {
    padding: 16,
  },
})