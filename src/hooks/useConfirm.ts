import { useSetRecoilState } from "recoil";
import { confirmState } from "recoil/atoms";

export function useConfirm() {
  const setConfirmHandle = useSetRecoilState(confirmState);
  const confirm = (message: string, callback: () => void) => {
    setConfirmHandle({
      message: message,
      callback: callback,
    });
  };

  return confirm;
}
