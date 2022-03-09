import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
  Tooltip
} from "recharts";
import { useTheme } from '@mui/material/styles';
import { Paper, Typography } from "@mui/material";

export default function Metrics() {

  const theme = useTheme();
  const [mainChartState, setMainChartState] = useState("monthly");

  const mainChartData = React.useMemo(() => {
    var resultArray = [];
    var cpuCore = getRandomData(31, 3500, 6500, 7500, 1000);
    var total5Load = getRandomData(31, 1500, 7500, 7500, 1500);
    var overallAvg = getRandomData(31, 1500, 7500, 7500, 1500);

    for (let i = 0; i < cpuCore.length; i++) {
      resultArray.push({
        cpuCore: cpuCore[i].value,
        total5Load: total5Load[i].value,
        overallAvg: overallAvg[i].value
      });
    }

    return resultArray;
  }, [mainChartState]); 

  console.log('mainchartdata:')
  console.log(mainChartData)
  return(
    <>
      <Paper>
        <Typography
          variant="h12"
          color="text"
          colorBrightness="secondary"
        >
          node exporter: Overall total disk & average disk used %
        </Typography>
      
      <ResponsiveContainer width="100%" minWidth={500} height={350}>
        <ComposedChart
              margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
              data={mainChartData}
        >
          <YAxis
            ticks={[0, 2500, 5000, 7500]}
            tick={{
              fill: theme.palette.text.hint + "80",
              fontSize: 14
            }}
            stroke={theme.palette.text.hint + "80"}
            tickLine={false}
          />
          <XAxis
            tickFormatter={i => i + 1}
            tick={{
              fill: theme.palette.text.hint + "80",
              fontSize: 14
            }}
            stroke={theme.palette.text.hint + "80"}
            tickLine={false}
          />
          <Tooltip />
          <Area
            type="natural"
            dataKey="cpuCore"
            fill={theme.palette.background.light}
            strokeWidth={1}
            activeDot={false}
          />
          <Line
            type="natural"
            dataKey="total5Load"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
          <Line
            type="linear"
            dataKey="overallAvg"
            stroke={theme.palette.warning.main}
            strokeWidth={2}
            dot={{
              stroke: theme.palette.warning.dark,
              strokeWidth: 2,
              fill: theme.palette.warning.main
            }}
            activeDot={{
              r: 8
            }}
          />          
        </ComposedChart>
      </ResponsiveContainer>
      </Paper>
    </>
  );

  //Generate Mock Data - Delete me
  function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    var array = new Array(length).fill();
    let lastValue;
  
    return array.map((item, index) => {
      let randomValue = Math.floor(Math.random() * multiplier + 1);
  
      while (
        randomValue <= min ||
        randomValue >= max ||
        (lastValue && randomValue - lastValue > maxDiff)
      ) {
        randomValue = Math.floor(Math.random() * multiplier + 1);
      }
  
      lastValue = randomValue;
  
      return { value: randomValue };
    });
  }
}