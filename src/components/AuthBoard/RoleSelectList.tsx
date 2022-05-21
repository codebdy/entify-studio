import { Box } from "@mui/material";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useConfirm } from "hooks/useConfirm";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { rolesState } from "recoil/atoms";
import { selectedRoleIdState } from "./recoil/atoms";
import intl from "react-intl-universal";
import RouterPrompt from "components/common/RouterPrompt";
import { TOOLBAR_HEIGHT } from "./consts";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useAuthChanged } from "./recoil/hooks/useAuthChanged";

export const RoleSelectList = memo(() => {
  const selectedServiceId = useSelectedServiceId();
  const [selectedRoleId, setSelectedRoleId] = useRecoilState(
    selectedRoleIdState(selectedServiceId)
  );
  const changed = useAuthChanged();

  const roles = useRecoilValue(rolesState);
  const confirm = useConfirm();

  // const [excuteSave, { loading: saving, error: saveError }] = useLazyMagicPost({
  //   onCompleted() {
  //     appStore.showSuccessAlert();
  //     boardStore.setChanged(false);
  //   },
  // });

  //useShowServerError(error || saveError);

  const handleChange = (roleId: number) => {
    if (roleId !== selectedRoleId) {
      if (changed) {
        confirm(intl.get("changing-not-save-message"), () => {
          setSelectedRoleId(roleId);
        });
      } else {
        setSelectedRoleId(roleId);
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
        flexFlow: "column",
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
          display: "flex",
          alignItems: "center",
          pl: 2,
        }}
      >
        {intl.get("role-list")}
      </Box>
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        <List
          sx={{
            "& .MuiListItemIcon-root": {
              minWidth: (theme) => theme.spacing(4),
            },
          }}
        >
          {roles.map((role) => {
            return (
              <ListItemButton
                key={role.id}
                selected = {selectedRoleId === role.id}
                onClick={() => handleChange(role.id)}
              >
                <ListItemIcon>
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={role.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
});
