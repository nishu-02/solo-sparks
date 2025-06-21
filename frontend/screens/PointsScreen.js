import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Title, ProgressBar, Text, Button } from "react-native-paper";
import axios from "axios";

export default function PointsScreen() {
  const [points, setPoints] = useState(0);

  const fetchPoints = async () => {
    const res = await axios.get("http://192.168.0.104:8000/api/profiles/");
    setPoints(res.data.find((p) => p.user).points); // pick the current user's profile
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Title>Your Spark Points</Title>
      <ProgressBar
        progress={(points % 100) / 100}
        style={{ marginVertical: 16 }}
      />
      <Text>You have {points} points</Text>
      <Button mode="outlined" style={{ marginTop: 20 }} onPress={fetchPoints}>
        Refresh Points
      </Button>
    </View>
  );
}
