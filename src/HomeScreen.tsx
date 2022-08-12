import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { Button, Card, DefaultTheme, Text } from "react-native-paper";
import { RootStackParamList } from "./types";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { UserInfo } from "./models";
import { onAuthenticate } from "./api";

WebBrowser.maybeCompleteAuthSession();

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [userInfo, setUserInfo] = React.useState<UserInfo | undefined>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "855471579042-1v01inf3d9l007jruvjn8sn544c07m4k.apps.googleusercontent.com",
    androidClientId:
      "855471579042-jiun4ciql9mnqpjdvokvnp7dq4c5u240.apps.googleusercontent.com",
    iosClientId:
      "855471579042-9bv12414ivk92ak8viarvud8eaae1o9i.apps.googleusercontent.com",
  });

  const onAuthenticateSuccess = (data: UserInfo) => {
    setUserInfo(data);
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication?.accessToken ?? "");
      onAuthenticate({
        token: response.authentication?.accessToken ?? "",
        onSuccess: onAuthenticateSuccess,
      });
    }
  }, [response]);

  const getUserData = async () => {
    onAuthenticate({
      token: accessToken,
      onSuccess: onAuthenticateSuccess,
    });
  };

  const onLogout = () => {
    setAccessToken("");
    setUserInfo(undefined);
  };

  const userDataElement = userInfo && (
    <Card>
      <Card.Content style={styles.card}>
        <Card.Cover source={{ uri: userInfo.picture }} style={styles.cover} />
        <View style={styles.welcomeTextContainer}>
          <Text style={[styles.text, styles.nameText]}>
            Hi, {userInfo.name}!
          </Text>
          <Text style={[styles.text, styles.infoText]}>
            Email: {userInfo.email}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <Card style={styles.card}>
        {userDataElement}
        <Card.Content>
          <Button
            mode="contained"
            disabled={!request}
            onPress={accessToken ? getUserData : () => promptAsync()}
          >
            {`${accessToken ? "Get user info" : "Login"}`}
          </Button>
          {accessToken && (
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
  welcomeTextContainer: {
    marginTop: 8,
  },
  text: {
    color: DefaultTheme.colors.text,
  },
  nameText: {
    fontSize: 16,
    lineHeight: 18,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 16,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
});

export default HomeScreen;
