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
        border: {
            dark: "#182f4b"
        }
    },
});