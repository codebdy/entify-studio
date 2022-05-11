import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { installedState } from "recoil/atoms";
import { INTALL_REGISTRY_URL } from "util/consts";

export function useInstallCheck() {
  const history = useHistory();
  const installed = useRecoilValue(installedState);
  useEffect(() => {
    if (installed === false) {
      history.push(INTALL_REGISTRY_URL);
    }
  }, [history, installed]);

}
