import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Card, Button, Title, Text } from "react-native-paper";
import axios from "axios";

export default function RewardsScreen() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.104:8000/api/rewards/")
      .then((res) => setRewards(res.data));
  }, []);

  const redeem = async (id) => {
    try {
      const res = await axios.post(
        `http://192.168.0.104:8000/api/rewards/${id}/redeem/`
      );
      alert(res.data.status);
    } catch (err) {
      alert("Not enough points");
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Title>Rewards Store</Title>
      {rewards.map((r) => (
        <Card key={r.id} style={{ marginVertical: 10 }}>
          <Card.Title title={r.name} />
          <Card.Content>
            <Text>{r.description}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => redeem(r.id)}>
              Redeem for {r.cost} pts
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}
