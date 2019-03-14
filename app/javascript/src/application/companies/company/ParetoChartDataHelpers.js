export function compileDailyChartLineDataPointsWithMinMax(filteredData) {
  let dps = [],
    yMarketAverage,
    yMarketVolumeValue,
    yMarketAverageMax = 0,
    yMarketVolumeMax = 0,
    yMarketAverageMin = 100000;
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
  return { dps, yMarketVolumeMax, yMarketAverageMax, yMarketAverageMin };
}
export function compileChartLineDataPointsWithMinMax(chartData) {
  let dps = [],
    yCloseValue,
    yVolumeValue,
    yCloseMax = 0,
    yVolumeMax = 0,
    yCloseMin = 100;
  for (let i = 0; i < chartData.length; i++) {
    yCloseValue = chartData[i].close;
    yVolumeValue = chartData[i].volume;
    if (yCloseValue >= yCloseMax) {
      yCloseMax = yCloseValue;
    }
    if (yCloseValue <= yCloseMin) {
      yCloseMin = yCloseValue;
    }
    if (yVolumeValue >= yVolumeMax) {
      yVolumeMax = yVolumeValue;
    }
    dps.push({ label: chartData[i].date, y: yCloseValue });
  }
  return { dps, yCloseMax, yVolumeMax, yCloseMin };
}
