import React, { Component } from 'react';
import { connect } from 'react-redux';
import CanvasJSReact from '../../canvasjs.react';
import { compileDailyChartLineDataPointsWithMinMax, compileChartLineDataPointsWithMinMax } from './ParetoChartDataHelpers.js';
import companyActions from '../../companies/company/companyActions';
const storeCompanyDateRange = companyActions.storeCompanyDateRange;
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
      }
      else {
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
    const isDaySelection = this.props.chartDateRange.startsWith('date/');
    const {
      dps,
      yVolumeMax,
      yCloseMax,
      yCloseMin,
    } = compileChartLineDataPointsWithMinMax(this.props.chartData, isDaySelection);
    // adding in the click handler to the line data points
    chart.addTo("data", { dataPoints: dps, type: "line", yValueFormatString: "0.##" % "" });
    chart.data[1].set("axisYType", "secondary", false);
    // axisY is the volume, axis Y2 is the Close
    chart.axisY[0].set("maximum", Math.ceil((yVolumeMax / 10)) * 10);
    chart.axisY2[0].set("maximum", Math.ceil((yCloseMax / 10)) * 10);
    chart.axisY2[0].set("minimum", Math.floor((yCloseMin / 10)) * 10);
  }
  compileDataPoints = () => {
    let dataPoints;
    const isDaySelection = this.props.chartDateRange.startsWith('date/');
    if (isDaySelection) {
      dataPoints = this.props.chartData.map((itemObj, ind) => {
        return {
          label: itemObj.label,
          y: itemObj.volume,
        };
      })
    } else {
      dataPoints = this.props.chartData.map((itemObj, ind) => {
        return {
          label: itemObj.date,
          y: itemObj.volume,
          click: (e) => this.props.storeCompanyDateRange(`date/${(e.dataPoint.label).split('-').join('')}`)
        };
      })
    }
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
    const isDaySelection = this.props.chartDateRange.startsWith('date/');
    const options = {
      title: {
        text: `${this.props.company.companyName} (${this.props.chartDateRange})`
      },
      axisX: {
        title: isDaySelection ? "Minute" : "Date",
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
export default connect(
  state => ({
    company: state.company.selectedCompany || {},
    chartData: state.company.chartData || [],
    chartDateRange: state.company.chartDateRange || 'ytd',
    error: state.company.error || null,
  }),
  {
    storeCompanyDateRange
  }
)(ParetoChart);