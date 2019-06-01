import {
  compileDailyChartLineDataPointsWithMinMax,
  compileChartLineDataPointsWithMinMax,
} from './ParetoChartDataHelpers';
import companyData from './companyData';
const testDailyData = companyData.stockDataForOneDay;
const testData = companyData.stockDataForSixMonths;

describe('compileDailyChartLineDataPointsWithMinMax', () => {
  it('returns an array of data as label and y values', () => {
    const eDps = [
      { label: '09:30', y: 82.816 },
      { label: '09:31', y: 82.298 },
      { label: '09:32', y: 82.125 },
      { label: '09:33', y: 81.725 }]
    const expected = {
      dps: eDps,
      yMarketVolumeMax: 14114,
      yMarketAverageMax: 82.816,
      yMarketAverageMin: 81.725,
    };
    const actual = compileDailyChartLineDataPointsWithMinMax(testDailyData);
    expect(actual).toEqual(expected);
  });
  it('handles an empty array of data', () => {
    const expected = {
      dps: [],
      yMarketVolumeMax: 0,
      yMarketAverageMax: 0,
      yMarketAverageMin: 0,
    };
    const actual = compileDailyChartLineDataPointsWithMinMax([]);
    expect(actual).toEqual(expected)
  });
});
describe('compileChartLineDataPointsWithMinMax', () => {
  it('returns an array of data as label and y values', () => {
    const eDps = [
      { label: "2019-02-11", y: 87.01 },
      { label: "2019-02-12", y: 88.61 },
      { label: "2019-02-13", y: 88.37 },
      { label: "2019-02-14", y: 90.69 },
      { label: "2019-02-15", y: 90.8 }]
    const expected = {
      dps: eDps,
      yCloseMax: 90.8,
      yVolumeMax: 222476,
      yCloseMin: 87.01,
    };
    const actual = compileChartLineDataPointsWithMinMax(testData);
    expect(actual).toEqual(expected);
  });
  it('handles an empty array of data', () => {
    const expected = {
      dps: [], yCloseMax: 0,
      yVolumeMax: 0,
      yCloseMin: 0,
    };
    const actual = compileChartLineDataPointsWithMinMax([]);
    expect(actual).toEqual(expected)
  });
});