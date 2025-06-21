import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { Card, Title, Text, Button, Chip, Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuests } from "../store/slices/questSlice";
import axios from "axios";

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const quests = useSelector((state) => state.quests.list);

  useEffect(() => {
    dispatch(fetchQuests());
  }, []);

  const getRecommended = async () => {
    await axios.get("http://192.168.0.104:8000/api/quests/recommended/");
    dispatch(fetchQuests());
  };

  return (
    <ScrollView style={{ padding: 24, backgroundColor: "#f7f7fa" }}>
      <Title style={{ marginBottom: 18, color: "#4b0082", fontSize: 28 }}>
        Today's Quests
      </Title>
      {quests.map((q) => (
        <Card
          key={q.id}
          style={{
            marginVertical: 18,
            borderRadius: 18,
            elevation: 4,
            backgroundColor: "#fff",
          }}
        >
          <Card.Title
            title={q.title}
            subtitle={
              q.quest_type
                ? q.quest_type.charAt(0).toUpperCase() +
                  q.quest_type.slice(1) +
                  " Quest"
                : ""
            }
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="star"
                color="#fff"
                style={{ backgroundColor: "#4b0082" }}
              />
            )}
          />
          <Card.Content>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              {q.description}
            </Text>
            {q.context ? (
              <Text style={{ color: "#888", marginBottom: 6 }}>
                Context: {q.context}
              </Text>
            ) : null}
            {q.tags && q.tags.split(",").length > 0 && (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 6,
                }}
              >
                {q.tags.split(",").map((tag, idx) => (
                  <Chip
                    key={idx}
                    style={{ marginRight: 6, marginBottom: 4 }}
                    icon="tag"
                  >
                    {tag.trim()}
                  </Chip>
                ))}
              </View>
            )}
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              style={{ backgroundColor: "#4b0082", borderRadius: 8 }}
              onPress={() => navigation.navigate("Reflect", { questId: q.id })}
            >
              Reflect
            </Button>
          </Card.Actions>
        </Card>
      ))}
      <Button
        mode="contained"
        icon="plus"
        onPress={getRecommended}
        style={{ marginTop: 24, backgroundColor: "#4b0082", borderRadius: 8 }}
        labelStyle={{ fontSize: 18 }}
      >
        Generate New Quest
      </Button>
    </ScrollView>
  );
}
