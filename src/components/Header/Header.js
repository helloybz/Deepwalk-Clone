import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export function Header() {
    return (
        <Box>
            <AppBar position="fixed"
                sx={{
                    backgroundImage: 'none',
                    bgcolor: 'background.dark',
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: 'divider.dark',
                }}>
                <Toolbar>
                    <Typography
                        sx={{
                            fontSize: 'h5.fontSize',
                            fontWeight: '600',
                            color: 'text.dark',
                            ":hover": {
                                cursor: "pointer",
                            }
                        }}
                        onClick={() => (window.location.href = '/')}
                    >
                        helloybz.
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box >
    )
}