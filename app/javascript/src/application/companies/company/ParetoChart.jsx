import React, { Component } from 'react';
import { connect } from 'react-redux';
import CanvasJSReact from '../../canvasjs.react';
import { compileDailyChartLineDataPointsWithMinMax, compileChartLineDataPointsWithMinMax } from './ParetoChartDataHelpers.js';
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
  }
  createDailyParetoFromData = () => {
    const chart = this.chart;
    const filteredData = this.props.chartData.filter(item => item.marketAverage > 0);
    const {
      dps,
      yMarketVolumeMax,
      yMarketAverageMax,
      yMarketAverageMin,
    } = compileDailyChartLineDataPointsWithMinMax(filteredData);

    chart.addTo("data", { dataPoints: dps, type: "line", yValueFormatString: "0.##" % "" });
    chart.data[1].set("axisYType", "secondary", false);
    // // axisY is the marketVolume, axisY2 is the marketAverage
    chart.axisY[0].set("maximum", Math.ceil((yMarketVolumeMax / 10)) * 10);
    chart.axisY2[0].set("maximum", Math.ceil(yMarketAverageMax));
    chart.axisY2[0].set("minimum", Math.floor(yMarketAverageMin));
  }
  createParetoFromData = () => {
    let chart = this.chart;
    const {
      dps,
      yVolumeMax,
      yCloseMax,
      yCloseMin,
    } = compileChartLineDataPointsWithMinMax(this.props.chartData);

    chart.addTo("data", { dataPoints: dps, type: "line", yValueFormatString: "0.##" % "" });
    chart.data[1].set("axisYType", "secondary", false);
    // axisY is the volume, axis Y2 is the Close
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
        text: `${this.props.company.companyName} (${this.props.chartDateRange})`
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
        text: `${this.props.company.companyName} (${this.props.chartDateRange})`
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
      </div>
    );
  }
}
export default connect(state => ({
  company: state.company.selectedCompany || {},
  chartData: state.company.chartData || [],
  chartDateRange: state.company.chartDateRange || 'ytd',
  error: state.company.error || null,
}))(ParetoChart);