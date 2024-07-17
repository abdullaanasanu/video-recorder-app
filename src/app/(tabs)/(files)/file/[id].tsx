import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Link, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Button,
} from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Media } from "./_media";
import { AudioPlayer } from "./_audio";

export default function EditorScreen() {
  const { id } = useLocalSearchParams();

  const sceneDefault: any = {
    id: 1,
    audio: null,
    thumb: "https://images.pexels.com/photos/8566449/pexels-photo-8566449.jpeg",
  };

  const [scenes, setScenes] = useState([sceneDefault]);

  const styles = getStyles(useThemeColor);

  // scene add
  const addScene = () => {
    setScenes([
      ...scenes,
      {
        id: scenes.length + 1,
        audio: null,
        thumb: null,
      },
    ]);
  };

  return (
    <ScrollView style={styles.scroller}>
      <View style={styles.container}>
        {scenes.map((scene, index) => (
          <View style={styles.scene} key={scene.id}>
            <Text style={styles.sceneHead}>Scene {index + 1} </Text>

            <Media scene={scene} scenes={scenes} setScenes={setScenes} />
            <AudioPlayer scene={scene} scenes={scenes} setScenes={setScenes} />
          </View>
        ))}
        <Pressable style={styles.sceneAdd} onPress={addScene}>
          <MaterialCommunityIcons
            name="plus"
            size={24}
            style={styles.sceneAddIcon}
          />
        </Pressable>
      </View>
      <Link href="../player">
        <View style={styles.bottom}>
          <Text style={styles.sceneHead}>View Video</Text>
        </View>
      </Link>
    </ScrollView>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    bottom: {
      // position: "absolute",
      bottom: 0,
      width: "100%",
      padding: 15,
    },
    scroller: {
      backgroundColor: theme({}, "backgroundLight"),
      minHeight: "100%",
    },
    container: {
      backgroundColor: theme({}, "backgroundLight"),
      flex: 1,
      padding: 15,
      justifyContent: "flex-start",
      alignItems: "center",
      overflow: "scroll",
    },
    scene: {
      backgroundColor: theme({}, "background"),
      padding: 12,
      borderRadius: 10,
      width: "100%",
      rowGap: 10,
      marginBottom: 10,
    },
    sceneHead: {
      color: theme({}, "text"),
    },
    sceneThumb: {
      width: 100,
      height: 100,
      borderRadius: 5,
    },
    imageBox: {
      width: 100,
      height: 100,
      backgroundColor: theme({}, "backgroundLight"),
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    sceneAdd: {
      backgroundColor: theme({}, "background"),
      padding: 5,
      borderRadius: 50,
    },
    sceneAddIcon: {
      color: theme({}, "text"),
    },
  });
}
