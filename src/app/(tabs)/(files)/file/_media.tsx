import { useThemeColor } from "@/src/hooks/useThemeColor";
import { View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

export function Media({ scene, scenes, setScenes }: any) {
  const styles = getStyles(useThemeColor);
  const [image, setImage] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
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
        const updatedScenes = scenes.map((s: any) => {
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

  // async function getAlbums() {
  //   if (permissionResponse && permissionResponse.status !== "granted") {
  //     await requestPermission();
  //   }
  //   const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
  //     includeSmartAlbums: true,
  //   });
  //   console.log("fetchedAlbums", fetchedAlbums);
  //   // setAlbums(fetchedAlbums);
  // }

  // const takePic = async () => {
  //   const { uri } = await Camera.takePictureAsync();
  //   const asset = await MediaLibrary.createAssetAsync(image);
  // }

  return (
    <Pressable onPress={() => pickImage(scene)}>
      {/* <Pressable onPress={() => getAlbums()}> */}
      {scene.thumb ? (
        <Image source={scene.thumb} style={styles.sceneThumb} />
      ) : (
        // <Link href="../camera" style={styles.imageBox}>
        <View style={styles.imageBox}>
          <MaterialCommunityIcons
            name="image-plus"
            size={48}
            style={styles.sceneAddIcon}
          />
          {/* </Link> */}
        </View>
      )}
    </Pressable>
  );
}

function getStyles(theme: any) {
  return StyleSheet.create({
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
    sceneAddIcon: {
      color: theme({}, "text"),
    },
  });
}
