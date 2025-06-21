import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Title, Text, ProgressBar } from "react-native-paper";
import axios from "axios";

export default function ProgressScreen() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    axios
      .get("http://192.168.0.104:8000/api/reflections/")
      .then((res) => setCompleted(res.data.length));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Title>Your Growth Journey</Title>
      <Text style={{ marginVertical: 10 }}>Quests Completed: {completed}</Text>
      <ProgressBar progress={completed / 30} />
      <Text style={{ marginTop: 10 }}>
        Goal: 30 reflections for next milestone
      </Text>
    </View>
  );
}
