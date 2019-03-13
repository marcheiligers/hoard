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
    let yMarketAverage, yMarketVolumeValue, yMarketAverageMax = 0, yMarketVolumeMax = 0, yMarketAverageMin = 100000;
    const filteredData = this.props.chartData.filter(item => item.marketAverage > 0);
    for (let i = 0; i < filteredData.length; i++) {
      yMarketAverage = filteredData[i].marketAverage;
      yMarketVolumeValue = filteredData[i].marketVolume;
      // setting max and mins
      if (yMarketAverage >= yMarketAverageMax) {
        yMarketAverageMax = yMarketAverage;
      }
      if (yMarketAverage <= yMarketAverageMin) {
        yMarketAverageMin = yMarketAverage;
      }
      if (yMarketVolumeValue >= yMarketVolumeMax) {
        yMarketVolumeMax = yMarketVolumeValue;
      }
      dps.push({ label: filteredData[i].minute, y: yMarketAverage });
    }
    chart.addTo("data", { type: "line", yValueFormatString: "0.##" % "", dataPoints: dps, xValueType: 'dateTime', xValueFormatString: 'DD-MMM-YYYY' });
    chart.data[1].set("axisYType", "secondary", false);
    // axisY is the marketVolume, axisY2 is the marketAverage
    chart.axisY[0].set("maximum", Math.ceil((yMarketVolumeMax / 10)) * 10);
    chart.axisY2[0].set("maximum", Math.ceil(yMarketAverageMax));
    chart.axisY2[0].set("minimum", Math.floor(yMarketAverageMin));
  }
  createParetoFromData = () => {
    let dps = [];
    let chart = this.chart;
    let yCloseValue, yVolumeValue, yCloseMax = 0, yVolumeMax = 0, yCloseMin = 100;
    for (let i = 0; i < this.props.chartData.length; i++) {
      yCloseValue = this.props.chartData[i].close;
      yVolumeValue = this.props.chartData[i].volume;
      if (yCloseValue >= yCloseMax) {
        yCloseMax = yCloseValue;
      }
      if (yCloseValue <= yCloseMin) {
        yCloseMin = yCloseValue;
      }
      if (yVolumeValue >= yVolumeMax) {
        yVolumeMax = yVolumeValue;
      }
      dps.push({ label: this.props.chartData[i].date, y: yCloseValue });
    }
    chart.addTo("data", { type: "line", yValueFormatString: "0.##" % "", dataPoints: dps });
    chart.data[1].set("axisYType", "secondary", false);
    chart.axisY[0].set("maximum", Math.ceil((yVolumeMax / 10)) * 10);
    chart.axisY2[0].set("maximum", Math.ceil((yCloseMax / 10)) * 10);
    chart.axisY2[0].set("minimum", Math.floor((yCloseMin / 10)) * 10);
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
        text: `${this.props.company.companyName} for ${this.props.chartDateRange}`
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
        text: `${this.props.company.companyName} for ${this.props.chartDateRange}`
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
          xValueType: 'dateTime', xValueFormatString: 'YYY-MMM-DD'
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