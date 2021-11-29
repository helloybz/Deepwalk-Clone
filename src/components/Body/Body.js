import { Box, Grid, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { Plot } from "./Plot"
import { data, plot } from './content';

export function Body() {
    return (
        <Grid
            container
            component={Box}
            sx={{
                "padding": {
                    "xs": '0 1rem',
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
                    lineHeight: {
                        xs: "2.5rem",
                        md: "3rem",
                    },
                    marginBottom: '1rem'
                }}
            >
                Deepwalk Clone
                <GitHub
                    sx={{
                        marginLeft: "2rem",
                        fontSize: "2rem",
                        ":hover": { cursor: "pointer" }
                    }}
                    onClick={() => (window.location.href = "https://github.com/helloybz/deepwalk-clone")}
                />

            </Grid>
            <Grid item xs={12} lg={6} sx={{
                marginBottom: "1rem",
                height: {
                    xs: "20rem",
                    lg: "40rem",
                }
            }}>
                <Plot data={plot.zachary} title='Zachary Karate Club' />
            </Grid>
            {
                data.map((section, i) => (
                    <Grid item xs={12} key={i} sx={{
                        marginBottom: "1rem"
                    }}>
                        <Typography
                            sx={{
                                color: 'rgb(243, 246, 249)',
                                fontSize: '2rem',
                                lineHeight: '2rem',
                                marginBottom: '0.5rem',
                                fontWeight: '1000'
                            }}>
                            {section.header}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgb(243, 246, 249)',
                                fontSize: '1.2rem',
                            }}>
                            {section.content}
                        </Typography>
                    </Grid>
                ))
            }


        </Grid >
    )
}