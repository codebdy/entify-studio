import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { tokenState } from "recoil/atoms";
import { TOKEN_NAME } from "util/consts";

export function useToken() {
  const memoToken = useRecoilValue(tokenState);
  const storageToken = useMemo(() => localStorage.getItem(TOKEN_NAME), []);

  return memoToken || storageToken;
}
