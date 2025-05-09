import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

export default function GifBackground() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ html: `<html><body style="margin:0;padding:0;"><img src="https://i.pinimg.com/originals/fe/bc/64/febc64447ea066414d012b74d49d1c10.gif" style="width:100%;height:100%;object-fit:cover;" /></body></html>` }}
        originWhitelist={["*"]}
        style={styles.webview}
        scrollEnabled={false}
        javaScriptEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  webview: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
});