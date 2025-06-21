import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Title, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const res = await dispatch(login({ username, password }));
    if (res.meta.requestStatus === "fulfilled") {
      navigation.replace("Onboarding"); // redirect to onboarding
    }
  };

  return (
    <View style={{ padding: 20, justifyContent: "center", flex: 1 }}>
      <Title style={{ marginBottom: 10 }}>Login to Solo Sparks</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Text style={{ marginTop: 16, color: "gray" }}>
        Test user: admin / admin123
      </Text>
    </View>
  );
}
