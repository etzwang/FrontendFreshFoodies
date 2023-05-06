import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from "react-native";
import Button from "../components/Button.js";
import { Camera, CameraType } from 'expo-camera';
import { useNavigation, useIsFocused, useFocusEffect, useCallback } from "@react-navigation/native";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const TakeReceiptPhotoScreen = () => {
  const [camera, setCamera] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFlash, setIsFlash] = useState(false);
  const [takePhotoTitle, setTakePhotoTitle] = useState("Take Photo");

  const isFocused = useIsFocused();

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      ensureCameraPermissions()
    }, [])
  );

  const ensureCameraPermissions = async () => {
    console.log("ensuring camera permissions")
    const cameraPermission = await Camera.getCameraPermissionsAsync();

    if (cameraPermission.granted == false) {
      const status = await Camera.requestCameraPermissionsAsync();
      if (status.granted == false) {
        alert("GIVE PHOTO PERMISSION PLEASE")
      }
    }
  }

  const takePhoto = async () => {
    if (!isCameraReady) {
      alert("CAMERA NOT READY")
      return;
    }

    setTakePhotoTitle("Loading...");

    try {
      if (camera !== null) {
        const image = await camera.takePictureAsync(
          {
            base64: true,
            quality: 0.1
          }
        );

        let image_cropped = await manipulateAsync(
          image.uri,
          [
            { crop: { originX: image.width * 0.2, originY: 0, height: image.height, width: image.width * 0.6 }},
          ],
          {
            base64: true,
            format: SaveFormat.JPG
          }
        )
        navigation.push("ConfirmReceiptPhotoScreen", { b64: image_cropped.base64 })
      }
    } catch (error) {
      console.log(error);
      alert(error)
    }

    setTakePhotoTitle("Take Photo");
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Upload items</Text>
        <View style={styles.form}>
          <View style={styles.flashFlex}>
            <Text>Flash</Text>
            <Switch
              onValueChange={setIsFlash}
              value={isFlash}
            />
          </View>
        {
          isFocused &&
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.camera}
            type={CameraType.back}
            autoFocus={ true }
            onCameraReady={() => setIsCameraReady(true)}
            flashMode={ isFlash ? "on" : "off" }
          />
        }
        <View style={styles.guideLines}>
        </View>
        <Button onPress={takePhoto} title={takePhotoTitle} color="#2FC6B7" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#2FC6B7",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 35,
    paddingBottom: "1%",
  },
  form: {
    width: "100%",
    height: "87.5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  camera: {
    width: "90%",
    height: "80%",
    marginBottom: 10
  },
  guideLines: {
    borderStyle: 'dotted',
    borderWidth: 2,
    position: 'absolute',
    borderColor: "red",
    top: "6.5%",
    left: "25%",
    width: "50%",
    height: "80%",
  },
  flashFlex: {
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "stretch",
    height: 20,
    marginBottom: 10
  }
});

export default TakeReceiptPhotoScreen;
