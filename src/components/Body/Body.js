import { Box, Grid, Typography } from "@mui/material";


export function Body() {
    return (
        <Grid
            container
            component={Box}
            sx={{
                "padding": {
                    "xs": '0 0',
                    "md": '0 16rem'
                }
            }}
        >
            <Grid item component={Typography} xs={12}
                sx={{
                    color: "text.dark",
                    fontSize: {
                        xs: "2.5rem",
                        md: "3rem",
                    },
                    fontWeight: "600",
                }}
            >
                Deepwalk Clone
            </Grid>

            <Grid item xs={12}>
                <Typography
                    sx={{
                        color: 'rgb(243, 246, 249)',
                    }}>
                </Typography>
            </Grid>

        </Grid >
    )
}