import { useAppSelector } from "../utils/hook";
import { useStyles } from "./styles";
import {
  Box,
  Grid,
  Icon,
  IconButton,
  InputBase,
  useTheme,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";

const TopBarComponent = () => {
  const theme = useTheme();
  const colorMode: any = useContext(ColorModeContext);
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid>Welcome, Wendy</Grid>
      <Box display="flex">
        <Grid className={classes.iconBlock}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            className={classes.themeIcon}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
        </Grid>
        <Grid className={classes.searchBlock}>
          <IconButton className={classes.searchIcon}>
            <SearchIcon />
          </IconButton>
          <InputBase className={classes.searchInput} placeholder="Search" />
        </Grid>
      </Box>
    </Box>
  );
};

export default TopBarComponent;
