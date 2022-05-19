import { useAuthUrl } from "do-ents/useAuthUrl";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authUrlState } from "recoil/atoms";

export function useInit() {
  const setAuthUrl = useSetRecoilState(authUrlState);
  const {
    authUrl,
    loading,
    error,
  } = useAuthUrl();

  useEffect(() => {
    setAuthUrl(authUrl);
  }, [setAuthUrl, authUrl]);

  return {
    loading,
    error,
  };
}
