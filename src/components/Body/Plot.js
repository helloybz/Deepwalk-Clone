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
                    position: "right",
                    textStyle: { color: 'white', fontSize: "2rem" },
                },
                backgroundColor: theme.palette.background.dark,
                colors: ["magenta", "yellow", "grey", "cyan"],
                hAxis: {
                    "gridlines": {
                        "color": theme.palette.border.dark,
                    },
                    "minorGridlines": {
                        "color": theme.palette.border.dark,
                    },
                    "baseline": {
                        "color": theme.palette.border.dark,
                    },
                    viewWindow: {
                        max: 1.5,
                        min: -4,
                    },
                },
                vAxis: {
                    "gridlines": {
                        "color": theme.palette.border.dark,
                    },
                    "minorGridlines": {
                        "color": theme.palette.border.dark,
                    },
                    "baseline": {
                        "color": theme.palette.border.dark,
                    },
                    viewWindow: {
                        max: 2.5,
                        min: -2,
                    },
                }
            }}
        />)
}