require 'test_helper'

class TradesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @trade = create(:trade)
  end

  test 'should get index' do
    get api_v1_trades_url
    assert_response :success
  end

  test 'should create a trade' do
    trade_params = { stock_id: @trade.stock_id, order_type: 'trade', executed_at: Time.now, price: 1.01, shares: 10 }
    assert_difference('Trade.count') do
      post api_v1_trades_url, params: { trade: trade_params }
    end

    assert_response :created
    assert_response_json_model(Trade.last, 'url' => "http://www.example.com/api/v1/trades/#{Trade.last.id}")
  end

  test "should show trade" do
    get api_v1_trade_url(@trade)
    assert_response :success
  end

  test "should update trade" do
    patch api_v1_trade_url(@trade), params: { trade: { price: 1.02, shares: 20 } }

    assert_response :ok
    assert_response_json_model(@trade.reload, 'url' => "http://www.example.com/api/v1/trades/#{@trade.id}")
  end

  test "should destroy trade" do
    assert_difference('Trade.count', -1) do
      delete api_v1_trade_url(@trade)
    end

    assert_response :no_content
  end
end
