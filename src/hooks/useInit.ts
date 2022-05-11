import { useAuthService } from "do-ents/useAuthService";
import { useInstalled } from "do-ents/useInstalled";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authServiceState, installedState } from "recoil/atoms";

export function useInit() {
  const setInstalled = useSetRecoilState(installedState);
  const setAuthService = useSetRecoilState(authServiceState);
  const {
    installed,
    loading: installedLoading,
    error: installedError,
  } = useInstalled();

  useEffect(() => {
    setInstalled(installed);
  }, [installed, setInstalled]);

  const { authService, loading, error } = useAuthService();

  useEffect(() => {
    setAuthService(authService);
  }, [authService, setAuthService]);

  return {
    loading: installedLoading || loading,
    error: installedError || error,
  };
}
