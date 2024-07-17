import { useThemeColor } from "@/src/hooks/useThemeColor";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  const sceneDefault: any = {
    id: 1,
    thumb: "https://images.pexels.com/photos/8566449/pexels-photo-8566449.jpeg",
  };

  const [scenes, setScenes] = useState([sceneDefault]);

  const styles = getStyles(useThemeColor);
  const [image, setImage] = useState(null);

  const pickImage = async (scene: any) => {
    try {
      // No permissions request is necessary for launching the image library
      // let result: any = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      //   quality: 1,
      // });
      // launch camera
      let result: any = await ImagePicker.launchCameraAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }

      if (result?.assets?.length > 0) {
        // update scene thumb
        const updatedScenes = scenes.map((s) => {
          if (s.id === scene.id) {
            return {
              ...s,
              thumb: result.assets[0].uri,
            };
          }
          return s;
        });
        setScenes(updatedScenes);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // scene add
  const addScene = () => {
    setScenes([
      ...scenes,
      {
        id: scenes.length + 1,
        thumb: null,
      },
    ]);
  };

  console.log("scene", scenes);

  return (
    <ScrollView style={styles.scroller}>
      <View style={styles.container}>
        {scenes.map((scene, index) => (
          <View style={styles.scene} key={scene.id}>
            <Text style={styles.sceneHead}>Scene {index + 1} </Text>

            <Pressable onPress={() => pickImage(scene)}>
              {scene.thumb ? (
                <Image source={scene.thumb} style={styles.sceneThumb} />
              ) : (
                <View style={styles.imageBox} />
              )}
            </Pressable>
            {/* <Image source={scene.thumb} style={styles.sceneThumb} /> */}
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
    </ScrollView>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
    scroller: {
      backgroundColor: theme({}, "backgroundLight"),
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
