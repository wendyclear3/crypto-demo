import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "./styles";
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../flex-between";
import { navMenu } from "../../common/mocks/navigate";
import { ColorModeContext, tokens } from "../../theme";
import Logo from "../../assets/images/sidebar/logo.svg";

const SidebarComponent = (props: any) => {
  const [active, setActive] = useState("");
  const { isNoneMobile, drawerWidth, isOpen, setIsOpen } = props;
  const classes = useStyles();
  const colorMode: any = useContext(ColorModeContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const renderNavMenu = navMenu.map((element): JSX.Element => {
    return (
      <ListItem key={element.id}>
        <ListItemButton
          className={classes.navItem}
          onClick={() => navigate(`${element.path}`)}
        >
          <ListItemIcon>{element.icon}</ListItemIcon>
          <ListItemText>
            <Typography variant={"body1"}>{element.name}</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box
            sx={{
              borderBottom: `1px solid ${colors.borderColor}`,
            }}
            width="100%"
          >
            <Box>
              <FlexBetween>
                <Box className={classes.brand}>
                  <img src={Logo} alt="logo" />
                  <Typography
                    variant="h1"
                    color={
                      theme.palette.mode === "dark"
                        ? colors.white.DEFAULT
                        : colors.black.DEFAULT
                    }
                  >
                    Demo
                  </Typography>
                </Box>
                {!isNoneMobile && (
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List sx={{ marginBottom: "55px" }}>{renderNavMenu}</List>
          </Box>
          <Box width="100%">
            <List>
              <ListItem>
                <ListItemButton className={classes.navItem}>
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>Logout</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SidebarComponent;
