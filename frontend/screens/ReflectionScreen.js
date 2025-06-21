import React, { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import {
  TextInput,
  Button,
  Title,
  ActivityIndicator,
  Text,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { useSelector } from 'react-redux';

export default function ReflectionScreen({ route, navigation }) {
  const { questId } = route.params;
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useSelector(state => state.auth.token);

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0]);
  };

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
    if (result.type === "success") setAudio(result);
  };

  const submitReflection = async () => {
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("quest", questId);
      formData.append("text", text);
      if (photo) {
        formData.append("photo", {
          uri: photo.uri,
          name: photo.fileName || "photo.jpg",
          type: photo.type || "image/jpeg",
        });
      }
      if (audio) {
        formData.append("audio", {
          uri: audio.uri,
          name: audio.name || "audio.m4a",
          type: "audio/m4a",
        });
      }
      console.log("JWT token used for reflection:", token);
      await axios.post(
        "http://192.168.0.104:8000/api/reflections/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      navigation.replace("Dashboard");
    } catch (e) {
      setError("Failed to submit reflection.");
    }
    setLoading(false);
  };

  return (
    <ScrollView style={{ padding: 24, backgroundColor: "#f7f7fa" }}>
      <Title style={{ marginBottom: 16, color: "#4b0082" }}>
        Submit Your Reflection
      </Title>
      <TextInput
        label="Text Reflection"
        value={text}
        onChangeText={setText}
        multiline
        style={{ marginBottom: 16, backgroundColor: "#fff" }}
      />
      <Button
        icon="image"
        mode="outlined"
        onPress={pickPhoto}
        style={{ marginBottom: 10 }}
      >
        {photo ? "Change Photo" : "Attach Photo"}
      </Button>
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 12,
            marginBottom: 10,
          }}
        />
      )}
      <Button
        icon="microphone"
        mode="outlined"
        onPress={pickAudio}
        style={{ marginBottom: 10 }}
      >
        {audio ? "Change Audio" : "Attach Audio"}
      </Button>
      {audio && <Text style={{ marginBottom: 10 }}>Audio: {audio.name}</Text>}
      {error ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
      ) : null}
      <Button
        mode="contained"
        onPress={submitReflection}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 10, backgroundColor: "#4b0082" }}
      >
        Submit
      </Button>
    </ScrollView>
  );
}
