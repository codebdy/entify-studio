import { Box } from "@mui/material";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useConfirm } from "hooks/useConfirm";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { rolesState } from "recoil/atoms";
import { authChangedState, selectedRoleIdState } from "./recoil/atoms";
import intl from "react-intl-universal";
import RouterPrompt from "components/common/RouterPrompt";
import { TOOLBAR_HEIGHT } from "./consts";

export const RoleSelectList = memo(() => {
  const selectedServiceId = useSelectedServiceId();
  const changed = useRecoilValue(authChangedState(selectedServiceId));
  const [selectedRoleId, setSelectedRoleId] = useRecoilState(
    selectedRoleIdState(selectedServiceId)
  );

  const roles = useRecoilValue(rolesState);
  const confirm = useConfirm();

  // const [excuteSave, { loading: saving, error: saveError }] = useLazyMagicPost({
  //   onCompleted() {
  //     appStore.showSuccessAlert();
  //     boardStore.setChanged(false);
  //   },
  // });

  //useShowServerError(error || saveError);

  const handleChange = (event: any) => {
    const roleId = event.target.value;
    if (roleId === "") {
      setSelectedRoleId(undefined);
      return;
    }
    if (roleId !== selectedRoleId) {
      if (changed) {
        confirm(intl.get("changing-not-save-message"), () => {
          setSelectedRoleId(roleId as any);
        });
      } else {
        setSelectedRoleId(roleId as any);
      }
    }
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        borderRight: (theme) => theme.palette.divider + " solid 1px",
        display: "flex",
        flexFlow:"column",
      }}
    >
      <RouterPrompt
        promptBoolean={changed}
        message={intl.get("changing-not-save-message")}
      />
      <Box
        sx={{
          height: TOOLBAR_HEIGHT,
          borderBottom: (theme) => theme.palette.divider + " solid 1px",
        }}
      ></Box>
    </Box>
  );
});
