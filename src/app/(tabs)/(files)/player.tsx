import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

export default function Player() {
  return (
    <WebView
      style={styles.container}
      source={{
        uri: "http://192.168.40.177:3000/",
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
