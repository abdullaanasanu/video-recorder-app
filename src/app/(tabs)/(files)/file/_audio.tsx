import { useThemeColor } from "@/src/hooks/useThemeColor";
import { View, StyleSheet, Pressable, Button } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Recording } from "./_record";

export const AudioPlayer = ({ scene, scenes, setScenes }: any) => {
  const styles = getStyles(useThemeColor);

  const [sound, setSound] = useState<any>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [recording, setRecording] = useState<any>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);

    // set scene audio
    const updatedScenes = scenes.map((s: any) => {
      if (s.id === scene.id) {
        return {
          ...s,
          audio: uri,
        };
      }
      return s;
    });
    setScenes(updatedScenes);
  }

  //   play sound
  const playSound = async () => {
    try {
      setIsPlaying(false);
      //   if (!sound) {
      //   const { sound } = await Audio.Sound.createAsync({
      //     uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      //   });
      //   setSound(sound);
      // }
      //   const { sound } = await Audio.Sound.createAsync({
      //     uri: scene.audio,
      //   });
      // set sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: scene.audio },
        { shouldPlay: true }
      );

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsPlaying(true);
    }
  };

  //   stop sound
  const stopSound = async () => {
    try {
      setIsPlaying(false);
      console.log("Stopping Sound");
      await sound.stopAsync();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.scene}>
      {scene.audio ? (
        <>
          {isPlaying ? (
            <Pressable onPress={() => stopSound()}>
              <MaterialCommunityIcons
                name="pause"
                size={24}
                style={styles.sceneAddIcon}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => playSound()}>
              <MaterialCommunityIcons
                name="play"
                size={24}
                style={styles.sceneAddIcon}
              />
            </Pressable>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <Button
            title={recording ? "Stop Recording" : "Start Recording"}
            onPress={recording ? stopRecording : startRecording}
          />
        </View>
      )}
    </View>
  );
};

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
