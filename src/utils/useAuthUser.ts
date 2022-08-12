import React from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { UserInfo } from "./models";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../redux/userSlice";
import { onAuthenticate } from "../api/user";
import { RootState } from "../redux/store";

WebBrowser.maybeCompleteAuthSession();

export const useAuthUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [accessToken, setAccessToken] = React.useState<string>("");
  // We put the user registered on the last session if it persisted
  const [userInfo, setUserInfo] = React.useState<UserInfo | undefined>(user);

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
    dispatch(onLogin({ ...data }));
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

  const onLoginCallback = async () => {
    await promptAsync();
  };

  const onLogoutCallback = () => {
    setAccessToken("");
    setUserInfo(undefined);
    dispatch(onLogout());
  };

  return {
    userInfo,
    onLogin: onLoginCallback,
    onLogout: onLogoutCallback,
    isLoading: !request,
  };
};
