require 'test_helper'

class StocksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stock = stocks(:one)
  end

  test "should get index" do
    get api_v1_stocks_url
    assert_response :success
  end

  test "should create stock" do
    assert_difference('Stock.count') do
      post api_v1_stocks_url, params: { stock: { annual_dividends: @stock.annual_dividends, heart: @stock.heart, name: @stock.name, star: @stock.star, symbol: @stock.symbol } }
    end

    assert_response :created
    assert_response_json_model(Stock.last)
  end

  test "should show stock" do
    get api_v1_stock_url(@stock)
    assert_response :success
  end

  test "should update stock" do
    patch api_v1_stock_url(@stock), params: { stock: { annual_dividends: @stock.annual_dividends, heart: @stock.heart, name: @stock.name, star: @stock.star, symbol: @stock.symbol } }

    assert_response :ok
    assert_response_json_model(@stock)
  end

  test "should destroy stock" do
    assert_difference('Stock.count', -1) do
      delete api_v1_stock_url(@stock)
    end

    assert_response :no_content
  end
end
