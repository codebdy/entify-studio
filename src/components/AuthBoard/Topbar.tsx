import { memo } from "react";
import {
  Box,
} from "@mui/material";
import intl from "react-intl-universal";

import { LoadingButton } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { authChangedState } from "./recoil/atoms";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";

export const Topbar = memo((props: {}) => {
  const selectedServiceId = useSelectedServiceId();
  const changed = useRecoilValue(authChangedState(selectedServiceId));
  // const [excuteSave, { loading: saving, error: saveError }] = useLazyMagicPost({
  //   onCompleted() {
  //     appStore.showSuccessAlert();
  //     boardStore.setChanged(false);
  //   },
  // });

  //useShowServerError(error || saveError);

  const handleSave = () => {
    // if (!boardStore.selectRole) {
    //   return;
    // }
    // const data = new MagicPostBuilder()
    //   .setEntity("RxRole")
    //   .setSingleData(boardStore.selectRole.toMeta())
    //   .toData();
    // excuteSave({ data });
  };
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <LoadingButton
        variant="contained"
        color="primary"
        size="medium"
        disabled={!changed}
        loading={false}
        onClick={handleSave}
      >
        {intl.get("save")}
      </LoadingButton>
    </Box>
  );
});
