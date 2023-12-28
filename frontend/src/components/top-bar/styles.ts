import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { tokens } from "../../theme";

export const useStyles = makeStyles((theme: Theme) => {
  const colors = tokens(theme.palette.mode);
  return {
    root: {
      background: `${colors.primary.DEFAULT} !important`,
      borderBottom: `1px solid ${colors.borderColor}`,
      boxShadow: "none !important",
    },
    toolbar: {
      justifyContent: "space-between",
      padding: "25px 45px",
    },
    menuIcon: {
      cursor: "pointer",
      marginRight: "10px",
    },
    iconBlock: {
      paddingRight: "35px",
      paddingTop: "12px",
      borderRight: `1px solid ${colors.borderColor}`,
    },
    themeIcon: {
      marginRight: "45px",
    },
    searchBlock: {
      display: "flex",
      maxHeight: "45px",
      borderRadius: "8px",
      marginLeft: "28px",
      backgroundColor: `${colors.primary[600]}`,
    },
    searchIcon: {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    searchInput: {
      padding: "18px 12px",
    },
  };
});
