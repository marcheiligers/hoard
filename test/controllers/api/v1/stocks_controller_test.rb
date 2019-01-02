require 'test_helper'

class StocksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stock = stocks(:one)
  end

  test 'should get index' do
    get api_v1_stocks_url
    assert_response :success
  end

  test 'should create stock with provided params' do
    stock_params = { symbol: 'AAPL', name: 'Apple', annual_dividends: 0, heart: false, star: false }
    assert_difference('Stock.count') do
      post api_v1_stocks_url, params: { stock: stock_params }
    end

    assert_response :created
    assert_response_json_model(Stock.last, 'url' => "http://www.example.com/api/v1/stocks/#{Stock.last.id}")
  end

  test 'should create stock with additional info from API when only symbol is provided' do
    assert_difference('Stock.count') do
      VCR.use_cassette('api/v1/stocks/create_symbol') do
        post api_v1_stocks_url, params: { stock: { symbol: 'AAPL' } }
      end
    end

    assert_response :created
    assert_response_json_model(Stock.last, 'url' => "http://www.example.com/api/v1/stocks/#{Stock.last.id}")
    assert_equal response_json['name'], 'Apple Inc.'
    assert_equal response_json['annualDividends'], 4
  end

  test "should show stock" do
    get api_v1_stock_url(@stock)
    assert_response :success
  end

  test "should update stock" do
    patch api_v1_stock_url(@stock), params: { stock: { annual_dividends: @stock.annual_dividends, heart: @stock.heart, name: @stock.name, star: @stock.star, symbol: @stock.symbol } }

    assert_response :ok
    assert_response_json_model(@stock, 'url' => "http://www.example.com/api/v1/stocks/#{@stock.id}")
  end

  test "should destroy stock" do
    assert_difference('Stock.count', -1) do
      delete api_v1_stock_url(@stock)
    end

    assert_response :no_content
  end
end
