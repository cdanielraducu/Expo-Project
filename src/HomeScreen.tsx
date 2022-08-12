import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Button, Card, DefaultTheme, Text } from "react-native-paper";
import { RootStackParamList } from "./utils/types";
import UserInfoContent from "./components/UserInfoContent";
import { useAuthUser } from "./utils/useAuthUser";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const onNavigateToUserInfo = () => {
    navigation.navigate("User", {});
  };

  const { userInfo, onLogin, onLogout, isLoading } = useAuthUser();

  const isLoggedIn = useMemo(() => userInfo, [userInfo]);

  return (
    <ScrollView style={styles.scrollView}>
      <Card style={styles.card}>
        {userInfo && <UserInfoContent userInfo={userInfo} />}
        <Card.Content>
          {!isLoggedIn && (
            <Button mode="contained" disabled={isLoading} onPress={onLogin}>
              Login
            </Button>
          )}
          <Button
            mode="contained"
            onPress={onNavigateToUserInfo}
            style={styles.logoutButton}
          >
            Navigate to user
          </Button>
          {isLoggedIn && (
            <Button
              mode="contained"
              onPress={onLogout}
              style={styles.logoutButton}
            >
              Logout
            </Button>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 8,
  },
  card: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
    flexDirection: "row",
  },
  logoutButton: {
    marginTop: 8,
  },
});

export default HomeScreen;
