import React, { Component } from 'react';
import { connect } from 'react-redux';
import CanvasJSReact from '../../canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ParetoChart extends Component {
  componentDidMount() {
    this.createParetoFromData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log(`Pareto Chart Updated `)
    }
    this.createParetoFromData(); // the chart was losing it's line graph on updating because we weren't calling the create method
  }
  createParetoFromData = () => {
    var dps = [];
    var chart = this.chart;
    var yCloseValue, yVolumeValue, yCloseMax = 0, yVolumeMax = 0;
    for (var i = 0; i < this.props.chartData.length; i++) {
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
    chart.axisY[0].set("maximum", Math.ceil(yVolumeMax));
    chart.axisY2[0].set("maximum", Math.ceil(yCloseMax));
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
  render() {
    const testDPtns = this.compileDataPoints();
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
          dataPoints: testDPtns,
        }
      ]
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
  chartError: state.company.chartError || null,
}))(ParetoChart);