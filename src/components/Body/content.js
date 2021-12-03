import { Grid, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

export function Content({ type, content, language }) {

    if (type === 'list') {
        var sentences = null;
        if (language === 'KOR') {
            sentences = content.kor.split('\n')
        } else {
            sentences = content.eng.split('\n')
        }
        return (
            <Grid item xs={12} container component={List}>
                {sentences.map((sentence, i) => (
                    <Grid key={i} item xs={12} component={ListItem}>
                        - {sentence}
                    </Grid>
                ))}
            </Grid>
        )
    } else if (type === 'paragraphs') {
        var paragraphs = null;
        if (language === 'KOR') {
            paragraphs = content.kor.split('\n')
        } else {
            paragraphs = content.eng.split('\n')
        }
        return (
            <Grid item xs={12} container component={List}>
                {paragraphs.map((paragraph, i) => (
                    <Grid item key={i} xs={12} component={ListItem}>
                        <Typography paragraph>
                            {paragraph}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        )
    } else if (type === 'table') {
        return (
            <Grid item xs={12} container>
                <Grid item xs={12}>
                    <Typography
                        variant="h5">{content.eng.title}
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ overflow: 'auto' }}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                {content.eng.header.map((name, i) => (
                                    <TableCell key={i}>{name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {content.eng.rows.map((row, i) => (
                                <TableRow key={i}>
                                    {row.map((val, j) => (
                                        <TableCell key={j}>{val}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <div>Error</div>
        )
    }
}


