import { UserInfo } from "../utils/models";

export const onAuthenticate = ({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: (data: UserInfo) => void;
}) => {
  return fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => onSuccess(data));
};
