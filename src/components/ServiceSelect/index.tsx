import {
  Box,
  Button,
  CircularProgress,
  List,
  Popover,
  SvgIcon,
  Typography,
} from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import intl from "react-intl-universal";
import { useScrollbarStyles } from "theme/useScrollbarStyles";
import { servicesState } from "recoil/atoms";
import { useSetRecoilState } from "recoil";
import { useGQLServices } from "do-ents/useGQLServices";
import { useShowServerError } from "hooks/useShowServerError";
import { AddServiceDialog } from "components/ModelBoard/EntityTree/AddServiceDialog";
import { ServiceItem } from "./ServiceItem";
import { useSelectedService } from "hooks/useSelectedService";

export const ServiceSelect = memo(() => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const scrollStyles = useScrollbarStyles();
  const setServices = useSetRecoilState(servicesState);
  const selectedService = useSelectedService();

  const { services, loading, error, refresh } = useGQLServices();

  useShowServerError(error);

  useEffect(() => {
    setServices(services || []);
  }, [services, setServices]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  return (
    <>
      <Button
        variant="text"
        color="inherit"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        {selectedService ? selectedService.name : intl.get("select-service")}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            width: "280px",
          }}
        >
          <Box
            sx={{
              height: (theme) => theme.spacing(6),
              display: "flex",
              alignItems: "center",
              borderBottom: (theme) => theme.palette.divider + " solid 1px",
              pl: 2,
              pr: 2,
            }}
          >
            <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
              {intl.get("services")}
            </Typography>
            {loading && <CircularProgress sx={{ ml: 1 }} size={24} />}
            <Box sx={{ flex: 1 }}></Box>
            <AddServiceDialog onAddFinished={refresh} onClose={handleClose} />
          </Box>
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 1,
              ...scrollStyles,
            }}
          >
            <List>
              {services?.map((service) => {
                return (
                  <ServiceItem
                    key={service.id}
                    service={service}
                    onClose={handleClose}
                  />
                );
              })}
            </List>
          </Box>
        </Box>
      </Popover>
    </>
  );
});
