import React, { useState } from "react";
import { ScrollView } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import axios from "axios";

export default function OnboardingScreen({ navigation }) {
  const [mood, setMood] = useState("");
  const [traits, setTraits] = useState("");
  const [needs, setNeeds] = useState("");

  const submitProfile = async () => {
    await axios.post("http://192.168.0.104:8000/api/profiles/", {
      mood,
      personality_traits: traits,
      emotional_needs: needs,
    });
    navigation.replace("Dashboard");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Title>Build Your Profile</Title>
      <TextInput
        label="Your Mood"
        value={mood}
        onChangeText={setMood}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Personality Traits"
        value={traits}
        onChangeText={setTraits}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Emotional Needs"
        value={needs}
        onChangeText={setNeeds}
        style={{ marginBottom: 10 }}
      />
      <Button mode="contained" onPress={submitProfile}>
        Submit
      </Button>
    </ScrollView>
  );
}
