import { useRegistryStatus } from "do-ents/useRegistryStatus";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { registryStatusState } from "recoil/atoms";

export function useInit() {
  const setInstallStatus = useSetRecoilState(registryStatusState);
  const {
    status,
    loading,
    error,
  } = useRegistryStatus();

  useEffect(() => {
    setInstallStatus(status);
  }, [status, setInstallStatus]);

  return {
    loading,
    error,
  };
}
