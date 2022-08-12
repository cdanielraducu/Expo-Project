import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, DefaultTheme } from "react-native-paper";
import { UserInfo } from "../utils/models";

interface UserInfoContentProps {
  userInfo: UserInfo;
  showExtraDetails?: boolean;
}

const UserInfoContent: React.FC<UserInfoContentProps> = ({
  userInfo,
  showExtraDetails,
}) => {
  return (
    <Card>
      <Card.Content style={styles.card}>
        <Card.Cover source={{ uri: userInfo.picture }} style={styles.cover} />
        <View style={styles.welcomeTextContainer}>
          <Text style={[styles.text, styles.nameText]}>
            Hi, {userInfo.name}!
          </Text>
          {showExtraDetails && (
            <Text style={[styles.text, styles.infoText]}>
              Email: {userInfo.email}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
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
});

export default UserInfoContent;
