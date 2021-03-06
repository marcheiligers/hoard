require 'test_helper'

class CompaniesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @symbol = 'CIM'
  end

  test "should show company" do
    VCR.use_cassette("api/v1/companies/#{@symbol}") do
      get api_v1_company_url(@symbol)
    end

    assert_response :success

    assert_equal @symbol, response_json['symbol']
    assert_equal 'Chimera Investment Corp.', response_json['companyName']
  end

  test "should fetch a chart for today" do
    VCR.use_cassette("api/v1/companies/#{@symbol}_chart") do
      get chart_api_v1_company_url(@symbol)
    end

    assert_response :success

    assert_equal 390, response_json.length
  end
end
