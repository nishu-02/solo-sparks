import React, { useState } from "react";
import { View } from "react-native";
import { Title, TextInput, Button } from "react-native-paper";
import axios from "axios";

export default function MoodUpdateScreen() {
  const [mood, setMood] = useState("");

  const updateMood = async () => {
    const res = await axios.get("http://192.168.0.104:8000/api/profiles/");
    const profile = res.data.find((p) => p.user);
    await axios.patch(`http://192.168.0.104:8000/api/profiles/${profile.id}/`, {
      mood,
    });
    alert("Mood updated");
  };

  return (
    <View style={{ padding: 20 }}>
      <Title>Update Your Mood</Title>
      <TextInput
        label="Your current mood"
        value={mood}
        onChangeText={setMood}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={updateMood}>
        Update
      </Button>
    </View>
  );
}
