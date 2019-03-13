import React, { Component } from 'react';
import { connect } from 'react-redux';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ParetoChart extends Component {
  componentDidMount() {
    if (this.props.chartDateRange === '1d') {
      this.createDailyParetoFromData();
    } else {
      this.createParetoFromData();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.chartDateRange === '1d') {
        this.createDailyParetoFromData();
      } else {
        this.createParetoFromData();
      }
    }
    // need to handle the specific case of selecting 1d where the time stamps are different.

  }
  createDailyParetoFromData = () => {
    let dps = [];
    let chart = this.chart;
    let yMarketAverage, yMarketVolumeValue, yMarketAverageMax = 0, yMarketVolumeMax = 0;
    const filteredData = this.props.chartData.filter(item => item.marketAverage > 0);
    for (let i = 0; i < filteredData.length; i++) {
      yMarketAverage = filteredData[i].marketAverage;
      yMarketVolumeValue = filteredData[i].marketVolume;
      console.log(yMarketAverage)
      console.log(yMarketVolumeValue)
      if (yMarketAverage >= yMarketAverageMax) {
        yMarketAverageMax = yMarketAverage;
      }
      if (yMarketVolumeValue >= yMarketVolumeMax) {
        yMarketVolumeMax = yMarketVolumeValue;
      }
      dps.push({ label: filteredData[i].minute, y: yMarketAverage });
    }
    chart.addTo("data", { type: "line", yValueFormatString: "0.##" % "", dataPoints: dps });
    chart.data[1].set("axisYType", "secondary", false);
    // axisY is the marketVolume, axisY2 is the marketAverage
    chart.axisY[0].set("maximum", Math.ceil(yMarketVolumeMax + (yMarketVolumeMax * 0.1))); // increases the max yRange to fit the data better
    chart.axisY2[0].set("maximum", Math.ceil(yMarketAverageMax + (yMarketAverageMax * 0.1)));
  }
  createParetoFromData = () => {
    let dps = [];
    let chart = this.chart;
    let yCloseValue, yVolumeValue, yCloseMax = 0, yVolumeMax = 0;
    for (let i = 0; i < this.props.chartData.length; i++) {
      yCloseValue = this.props.chartData[i].close;
      yVolumeValue = this.props.chartData[i].volume;
      if (yCloseValue >= yCloseMax) {
        yCloseMax = yCloseValue;
      }
      if (yVolumeValue >= yVolumeMax) {
        yVolumeMax = yVolumeValue;
      }
      dps.push({ label: this.props.chartData[i].date, y: yCloseValue });
    }
    chart.addTo("data", { type: "line", yValueFormatString: "0.##" % "", dataPoints: dps });
    chart.data[1].set("axisYType", "secondary", false);
    chart.axisY[0].set("maximum", Math.ceil(yVolumeMax + (yVolumeMax * 0.1))); // increases the max yRange to fit the data better
    chart.axisY2[0].set("maximum", Math.ceil(yCloseMax + (yCloseMax * 0.1))); // increases the max yRange to fit the data better
  }
  compileDataPoints = () => {
    const dataPoints = this.props.chartData.map((itemObj, ind) => {
      return {
        label: itemObj.date,
        y: itemObj.volume
      };
    })
    return dataPoints;
  }
  compileDailyDataPoints = () => {
    const dataPoints = this.props.chartData.map((itemObj, ind) => {
      return {
        label: itemObj.minute,
        y: itemObj.marketVolume
      };
    })
    const filteredData = dataPoints.filter((item) => item.y > 0);
    return filteredData;
  }
  compileChartOptions = () => {
    const options = {
      title: {
        text: `${this.props.company.companyName}`
      },
      axisX: {
        title: "Date"
      },
      axisY: {
        title: "Volume",
        lineColor: "#4F81BC",
        tickColor: "#4F81BC",
        labelFontColor: "#4F81BC"
      },
      axisY2: {
        title: "Closing Price",
        prefix: "$",
        lineColor: "#C0504E",
        tickColor: "#C0504E",
        labelFontColor: "#C0504E"
      },
      data: [
        {
          type: "column",
          dataPoints: this.compileDataPoints(),
        }
      ]
    }
    return options;
  }
  compileDailyChartOptions = () => {
    const options = {
      title: {
        text: `${this.props.company.companyName}`
      },
      axisX: {
        title: "Minute"
      },
      axisY: {
        title: "Market Volume",
        lineColor: "#4F81BC",
        tickColor: "#4F81BC",
        labelFontColor: "#4F81BC"
      },
      axisY2: {
        title: "Market Average",
        prefix: "$",
        lineColor: "#C0504E",
        tickColor: "#C0504E",
        labelFontColor: "#C0504E"
      },
      data: [
        {
          type: "column",
          dataPoints: this.compileDailyDataPoints(),
        }
      ]
    }
    return options;
  }
  render() {
    let options;
    if (this.props.chartDateRange !== '1d') {
      options = this.compileChartOptions();
    } else {
      options = this.compileDailyChartOptions();
    }
    return (
      <div>
        <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default connect(state => ({
  company: state.company.selectedCompany || {},
  chartData: state.company.chartData || [],
  chartDateRange: state.company.chartDateRange || 'ytd',
  chartError: state.company.chartError || null,
}))(ParetoChart);