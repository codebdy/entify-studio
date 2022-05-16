import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authServiceState, registryStatusState } from "recoil/atoms";
import { INTALL_AUTH_URL, INTALL_REGISTRY_URL } from "util/consts";

export function useInstallCheck() {
  const history = useHistory();
  const status = useRecoilValue(registryStatusState);
  const authService = useRecoilValue(authServiceState);
  useEffect(() => {
    if (status && !status?.installed) {
      history.push(INTALL_REGISTRY_URL);
    }else if(status && !status?.authInstalled) {
      history.push(INTALL_AUTH_URL);
    }
  }, [authService, history, status]);
}
