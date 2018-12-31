ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  make_my_diffs_pretty!()

  def assert_response_json_model(expected_model)
    expected = expected_model.attributes.merge('url' => "http://www.example.com/api/v1/stocks/#{expected_model.id}")
    actual = JSON.parse(response.body)

    assert_equal expected.keys, actual.keys,
      "Missing keys: #{expected.keys - actual.keys}, extra keys: #{actual.keys - expected.keys}"

    expected.each do |key, val|
      if key.ends_with?('at')
        assert_equal val.to_i, Time.parse(actual[key]).to_i
      else
        assert_equal val, actual[key]
      end
    end
  end
end
