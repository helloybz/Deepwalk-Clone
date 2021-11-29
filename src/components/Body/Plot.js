import { useTheme } from '@mui/material';
import Chart from 'react-google-charts';

export function Plot({ data, title }) {
    const theme = useTheme()
    return (
        <Chart
            width={'100%'}
            height={'100%'}
            chartType="ScatterChart"
            data={data}
            options={{
                title: title,
                titleTextStyle: {
                    color: "white",
                },
                legend: {
                    position: 'bottom',
                    textStyle: { color: 'white', fontSize: "2rem" }
                },
                backgroundColor: theme.palette.background.dark,
                colors: ["magenta", "yellow", "grey", "cyan"],
                hAxis: {
                    "gridlines": {
                        "color": theme.palette.divider.dark,
                    },
                    "minorGridlines": {
                        "color": theme.palette.divider.dark,
                    },
                    "baseline": {
                        "color": theme.palette.divider.dark,
                    },
                    viewWindow: {
                        max: 1.5,
                        min: -4,
                    },
                },
                vAxis: {
                    "gridlines": {
                        "color": theme.palette.divider.dark,
                    },
                    "minorGridlines": {
                        "color": theme.palette.divider.dark,
                    },
                    "baseline": {
                        "color": theme.palette.divider.dark,
                    },
                    viewWindow: {
                        max: 2.5,
                        min: -2,
                    },
                }
            }}
        />)
}