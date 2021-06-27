import React from "react";
import { View } from "react-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { theme } from "../theme/theme";

class LineChartSvg extends React.PureComponent {
  
  render() {
    const { xAxisData=[], xAxisLabels=[], yAxisData=[], yAxisLabels=[] } = this.props;

    const axesSvg = { fontSize: 10, fill: "grey" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

    const Gradient = () => (
      <Defs key={"gradient"}>
        <LinearGradient id={"gradient"} x1={"0"} y={"0%"} x2={"100%"} y2={"0%"}>
          <Stop offset={"0%"} stopColor={"rgb(134, 65, 244)"} />
          <Stop offset={"100%"} stopColor={"rgb(66, 194, 244)"} />
        </LinearGradient>
      </Defs>
    );

    // Layout of an x-axis together with a y-axis is a problem that stems from flexbox.
    // All react-native-svg-charts components support full flexbox and therefore all
    // layout problems should be approached with the mindset "how would I layout regular Views with flex in this way".
    // In order for us to align the axes correctly we must know the height of the x-axis or the width of the x-axis
    // and then displace the other axis with just as many pixels. Simple but manual.

    return (
      <View style={{ height: 200, padding: 5, flexDirection: "row" }}>
        <YAxis
          data={xAxisData}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ height: 200 }}
            data={xAxisData}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{
              strokeWidth: 2,
              stroke: "url(#gradient)",
            }}
          >
            <Grid svg={{stroke:theme.colors.dark}}/>
            <Gradient />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={xAxisLabels}
            formatLabel={(value, index) => xAxisLabels[index]}
            contentInset={{ left: 20, right: 20 }}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}

export default LineChartSvg;
