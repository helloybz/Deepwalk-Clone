import { useState } from 'react';
import { Box, Button, Grid, Fab, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { Plot } from "./Plot"
import { data, plot } from './data';
import { Content } from './Content.js';

export function Body() {
    const [language, set_language] = useState('KOR')

    const handleLanguage = () => {
        if (language === 'KOR') {
            set_language('ENG')
        } else {
            set_language('KOR')
        }
    }
    return (
        <Grid
            container
            component={Box}
            sx={{
                "padding": {
                    "xs": '0 1rem',
                    "md": '0 30rem'
                }
            }}
        >
            <Fab
                sx={{
                    position: "fixed",
                    bottom: { xs: '1rem', lg: '15rem' },
                    right: { xs: '1rem', lg: '15rem' },
                    zIndex: 1000,
                }} onClick={handleLanguage}
            >
                {language}
            </Fab>
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
                container
            >
                <Grid item xs={12} lg={'auto'}>
                    Deepwalk-Clone
                </Grid>
                <Grid
                    component={Button}
                    sx={{
                        marginLeft: "2rem",
                        fontSize: "2rem",
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: 'divider.dark',
                        borderRadius: '5rem',
                        ":hover": { cursor: "pointer" }
                    }}
                    onClick={() => (window.location.href = "https://github.com/helloybz/deepwalk-clone")}
                >
                    <GitHub />
                </Grid>

            </Grid>
            <Grid item xs={12} lg={12} sx={{
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
                            variant='h2'
                            sx={{
                                color: 'rgb(243, 246, 249)',
                                fontSize: '2rem',
                                lineHeight: '2rem',
                                marginBottom: '0.5rem',
                                fontWeight: '1000'
                            }}>
                            {language === 'KOR' ? section.header.kor : section.header.eng}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'rgb(243, 246, 249)',
                                fontSize: '1.2rem',
                            }}>
                            <Content type={section.content.type} content={section.content} language={language} />
                        </Typography>
                    </Grid>
                ))
            }


        </Grid >
    )
}