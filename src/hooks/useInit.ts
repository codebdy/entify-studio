import { useAuthUrl } from "do-ents/useAuthUrl";
import { useRoles } from "do-ents/useRoles";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authUrlState, rolesState } from "recoil/atoms";

export function useInit() {
  const setAuthUrl = useSetRecoilState(authUrlState);
  const setRoles = useSetRecoilState(rolesState);
  const { authUrl, loading, error } = useAuthUrl();

  const { roles, error: rolesError } = useRoles();

  useEffect(() => {
    setAuthUrl(authUrl);
  }, [setAuthUrl, authUrl]);

  useEffect(() => {
    setRoles(roles || []);
  }, [roles, setRoles]);

  return {
    loading: loading,
    error: error || rolesError,
  };
}
