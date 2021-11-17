import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#fff",
            dark: "#fff"
        },
        background: {
            default: "rgb(13, 25, 40)",
            dark: "rgb(13, 25, 40)"
        },
        text: {
            dark: "rgb(243, 246, 249)"
        },
        divider: {
            dark: "rgb(24, 47, 75)"
        }
    },
});