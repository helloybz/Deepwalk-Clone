import { Grid, List, ListItem, Typography } from "@mui/material";

export function Content({ type, content, language }) {

    if (type === 'list') {
        var sentences = null;
        if (language === 'KOR') {
            sentences = content.kor.split('\n')
        } else {
            sentences = content.eng.split('\n')
        }
        return (
            <Grid container component={List}>
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
            <Grid container component={List}>
                {paragraphs.map((paragraph, i) => (
                    <Grid item key={i} xs={12} component={ListItem}>
                        <Typography paragraph>
                            {paragraph}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        )
    }
}


