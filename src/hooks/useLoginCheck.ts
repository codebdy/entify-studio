import { useHistory } from "react-router-dom";
import { LOGIN_URL } from "util/consts";
import { useToken } from "./useToken";

export function useLoginCheck() {
  const history = useHistory();
  const token = useToken();

  if (!token) {
    history.push(LOGIN_URL);
  }
}
