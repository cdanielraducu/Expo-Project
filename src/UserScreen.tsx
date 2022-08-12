import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, DefaultTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import UserInfoContent from "./components/UserInfoContent";
import { RootState } from "./redux/store";
import { RootStackParamList } from "./utils/types";

export interface UserScreenProps {}

type UserScreenTypeProps = NativeStackScreenProps<RootStackParamList, "User">;

const BookScreen: React.FC<UserScreenTypeProps> = ({ route }) => {
  const { user: userInfo } = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={`User Information`} />
        {userInfo && <UserInfoContent userInfo={userInfo} showExtraDetails />}
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
