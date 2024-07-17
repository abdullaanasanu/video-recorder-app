import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const styles = getStyles(useThemeColor);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Section</Text>
    </View>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme({}, "backgroundLight"),
      flex: 1,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: theme({}, "text"),
    },
  });
}
