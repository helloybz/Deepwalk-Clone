import { useState } from 'react';
import { Box, Grid, Fab, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material"
import { Plot } from "./Plot"
import { data, plot } from './data';
import { Content } from './content.js';

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
            justifyContent='center'
        >
            <Fab
                sx={{
                    position: "fixed",
                    bottom: { xs: '1rem', lg: '5rem' },
                    right: { xs: '1rem', lg: '10rem' },
                    zIndex: 1000,
                }} onClick={handleLanguage}
            >
                {language}
            </Fab>
            <Fab
                sx={{
                    position: "fixed",
                    bottom: { xs: '5rem', lg: '10rem' },
                    right: { xs: '1rem', lg: '10rem' },
                    zIndex: 1000,
                }} onClick={() => (window.location.href = "https://github.com/helloybz/deepwalk-clone")}
            >
                <GitHub />
            </Fab>

            <Grid item component={Typography} xs={11} md={8}
                sx={{
                    color: "text.dark",
                    fontSize: {
                        xs: "2.1rem",
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
                Deepwalk-Clone
            </Grid>

            <Grid item xs={11} md={8} sx={{
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
                    <Grid item xs={11} md={8} key={i} sx={{
                        marginBottom: "1rem"
                    }} container>
                        <Grid item xs={12} component={Typography}
                            sx={{
                                color: 'rgb(243, 246, 249)',
                                fontSize: '2rem',
                                lineHeight: '2rem',
                                marginBottom: '0.5rem',
                                fontWeight: '1000'
                            }}>
                            {language === 'KOR' ? section.header.kor : section.header.eng}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                color: 'rgb(243, 246, 249)',
                                fontSize: '1.2rem',
                            }} container>
                            <Content type={section.content.type} content={section.content} language={language} />
                        </Grid>
                    </Grid>
                ))
            }


        </Grid >
    )
}