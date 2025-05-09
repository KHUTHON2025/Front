import React from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const NUM_IMAGES = 10;

const BeeBackground = () => {
  const randomHexes = Array.from({ length: NUM_IMAGES }).map((_, idx) => {
    const top = Math.random() * height;
    const left = Math.random() * width;
    const size = 50 + Math.random() * 40;

    return (
      <Image
        key={idx}
        source={require("../assets/image.png")}
        style={[
          styles.hex,
          {
            top,
            left,
            width: size,
            height: size,
            opacity: 0.1 + Math.random() * 0.2,
          },
        ]}
      />
    );
  });

  return <View style={styles.container}>{randomHexes}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  hex: {
    position: "absolute",
    resizeMode: "contain",
  },
});

export default BeeBackground;
