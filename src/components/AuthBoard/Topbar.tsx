import { memo } from "react";
import { Box } from "@mui/material";
import intl from "react-intl-universal";

import { LoadingButton } from "@mui/lab";
import { TOOLBAR_HEIGHT } from "./consts";
import { useAuthChanged } from "./recoil/hooks/useAuthChanged";
import { useSelectedRole } from "./recoil/hooks/useSelectedRole";

export const Topbar = memo((props: {}) => {
  const changed = useAuthChanged();
  const selectedRole = useSelectedRole();
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
        height: TOOLBAR_HEIGHT,
        display: "flex",
        alignItems: "center",
        borderBottom: (theme) => `${theme.palette.divider} solid 1px`,
        pr: 4,
      }}
    >
      <Box sx={{ flex: 1, pl: 2 }}>{selectedRole && selectedRole.name + intl.get("role-auth-setting")}</Box>
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
