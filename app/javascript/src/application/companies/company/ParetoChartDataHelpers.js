export function compileDailyChartLineDataPointsWithMinMax(filteredData) {
  let dps = [],
    yMarketAverage,
    yMarketVolumeValue,
    yMarketAverageMax = null,
    yMarketVolumeMax = null,
    yMarketAverageMin = null;
  for (let i = 0; i < filteredData.length; i++) {
    // on first pass, set the maxes and min
    if (i === 0) {
      yMarketAverageMax = filteredData[i].marketAverage;
      yMarketAverageMin = filteredData[i].marketAverage;
      yMarketVolumeMax = filteredData[i].marketVolume;
    }

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
  // adding default 0's for empty datasets
  yMarketVolumeMax = yMarketVolumeMax ? yMarketVolumeMax : 0
  yMarketAverageMax = yMarketAverageMax ? yMarketAverageMax : 0
  yMarketAverageMin = yMarketAverageMin ? yMarketAverageMin : 0
  return { dps, yMarketVolumeMax, yMarketAverageMax, yMarketAverageMin };
}
export function compileChartLineDataPointsWithMinMax(chartData) {
  let dps = [],
    yCloseValue,
    yVolumeValue,
    yCloseMax = null,
    yVolumeMax = null,
    yCloseMin = null;
  for (let i = 0; i < chartData.length; i++) {
    if (i === 0) {
      yCloseMax = chartData[i].close;
      yVolumeMax = chartData[i].volume;
      yCloseMin = chartData[i].close;
    }
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
  // adding default 0's for empty datasets
  yCloseMax = yCloseMax ? yCloseMax : 0
  yVolumeMax = yVolumeMax ? yVolumeMax : 0
  yCloseMin = yCloseMin ? yCloseMin : 0
  return { dps, yCloseMax, yVolumeMax, yCloseMin };
}
