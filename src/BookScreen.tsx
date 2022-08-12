import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, DefaultTheme } from "react-native-paper";
import { RootStackParamList } from "./types";

export interface BookProps {
  name: string;
}

type BookScreenProps = NativeStackScreenProps<RootStackParamList, "Book">;

const BookScreen: React.FC<BookScreenProps> = ({ route }) => {
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={`This is the ${name} title`} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: DefaultTheme.colors.background,
    alignItems: "center",
    paddingTop: 10,
  },
  card: {
    width: "90%",
  },
});

export default BookScreen;
