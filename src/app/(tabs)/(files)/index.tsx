import { useThemeColor } from "@/src/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const styles = getStyles(useThemeColor);

  return (
    <View style={styles.container}>
      <Link href="/file/1" style={styles.file}>
        {/* <MaterialCommunityIcons
          name="file"
          size={16}
          color={useThemeColor({}, "icon")}
        /> */}
        <Text style={styles.fileText}>File 1</Text>
      </Link>
    </View>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme({}, "backgroundLight"),
      flex: 1,
      padding: 20,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    file: {
      backgroundColor: theme({}, "background"),
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 10,
      width: "100%",
    },
    fileText: {
      color: theme({}, "text"),
      marginLeft: 10,
    },
  });
}
