import { StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import HiveCard from "../components/HiveCard";
import BeeBackground from "../components/BeeBackgrounds"; 

// Sample data for the beehives
// const hives = [
//   { id: "1", number: 1, status: "Normal", location: "North corner" },
//   { id: "2", number: 2, status: "Wasp detected", location: "East side" },
//   { id: "3", number: 3, status: "Normal", location: "South entrance" },
//   { id: "4", number: 4, status: "Normal", location: "West fence" },
//   { id: "5", number: 5, status: "Normal", location: "Center garden" },
//   { id: "6", number: 6, status: "Normal", location: "Orchard edge" },
// ]

export default function HomeScreen({ navigation }) {
  const [hives, setHives] = useState([]);

  useEffect(() => {
    const fetchHives = async () => {
      try {
        const hiveList = [];

        for (let id = 1; id <= 6; id++) {
          const res = await fetch(`https://calf-exact-anteater.ngrok-free.app/hive/${id}`);
          const data = await res.json();

          hiveList.push({
            id: id.toString(),
            number: data.hive_id,
            status: data.status || "Normal",
            location: data.address,
            live_url: data.live_url,
          });
        }

        setHives(hiveList);
      } catch (error) {
        console.error("❌ 벌통 데이터 불러오기 실패:", error);
      }
  };
//   const updated = hiveList.map((hive) =>
//     hive.number === 2 ? { ...hive, status: "Wasp detected" } : hive
//   );

//   setHives(updated);
// } catch (error) {
//   console.error("❌ 벌통 데이터 불러오기 실패:", error);
// }
// };

  fetchHives();
}, []);

  return (
  <View style={{ flex: 1 }}>
    <BeeBackground />
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.header}>
          <Text style={styles.title}>🐝 벌통 모니터</Text>
        </View>
        <FlatList
          data={hives}
          numColumns={2} 
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={{ flex: 1, padding: 8 }}>
              <HiveCard
                hive={item}
                onPressCamera={() =>
                  navigation.navigate("LiveCamera", {
                    hiveNumber: item.number,
                    liveUrl: item.live_url,
                  })
                }
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7ddff",
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContent: {
    padding: 16,
  },
})