require 'test_helper'

class PurchasesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @purchase = create(:purchase)
  end

  test 'should get index' do
    get api_v1_purchases_url
    assert_response :success
  end

  test 'should create a purchase' do
    purchase_params = { stock_id: @purchase.stock_id, order_type: 'trade', executed_at: Time.now, price: 1.01, shares: 10 }
    assert_difference('Purchase.count') do
      post api_v1_purchases_url, params: { purchase: purchase_params }
    end

    assert_response :created
    assert_response_json_model(Purchase.last, 'url' => "http://www.example.com/api/v1/purchases/#{Purchase.last.id}")
  end

  test "should show purchase" do
    get api_v1_purchase_url(@purchase)
    assert_response :success
  end

  test "should update purchase" do
    patch api_v1_purchase_url(@purchase), params: { purchase: { price: 1.02, shares: 20 } }

    assert_response :ok
    assert_response_json_model(@purchase.reload, 'url' => "http://www.example.com/api/v1/purchases/#{@purchase.id}")
  end

  test "should destroy purchase" do
    assert_difference('Purchase.count', -1) do
      delete api_v1_purchase_url(@purchase)
    end

    assert_response :no_content
  end
end
