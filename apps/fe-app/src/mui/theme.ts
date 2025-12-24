import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1CC9BA",
    },
    secondary: {
      main: "#FF9D00",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: "#666", // typed text color
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#666",
          "&.Mui-focused": {
            color: "#ff5722",
          },
        },
      },
    },
  },
});
