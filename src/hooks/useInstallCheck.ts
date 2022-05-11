import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authServiceState, installedState } from "recoil/atoms";
import { INTALL_AUTH_URL, INTALL_REGISTRY_URL } from "util/consts";

export function useInstallCheck() {
  const history = useHistory();
  const installed = useRecoilValue(installedState);
  const authService = useRecoilValue(authServiceState);
  useEffect(() => {
    if (installed === false) {
      history.push(INTALL_REGISTRY_URL);
    }else if(!authService) {
      history.push(INTALL_AUTH_URL);
    }
  }, [authService, history, installed]);
}
