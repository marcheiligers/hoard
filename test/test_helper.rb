ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

VCR.configure do |config|
  config.cassette_library_dir = 'fixtures/vcr'
  config.hook_into :faraday
end

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  make_my_diffs_pretty!

  def response_json
    @response_json ||= JSON.parse(response.body)
  end

  def assert_response_json_model(expected_model)
    expected = expected_model.attributes.merge('url' => "http://www.example.com/api/v1/stocks/#{expected_model.id}")
    actual = response_json

    actual_keys = actual.keys.map(&:underscore)
    assert_equal expected.keys, actual_keys,
      "Missing keys: #{expected.keys - actual_keys}, extra keys: #{actual_keys - expected.keys}"

    expected.each do |key, val|
      camel_key = key.camelize(:lower)
      if key.ends_with?('at')
        assert_equal val.to_i, Time.parse(actual[camel_key]).to_i, "Expected #{key} to equal #{val} but it was #{Time.parse(actual[camel_key])}"
      else
        assert_equal val, actual[camel_key], "Expected #{key} to equal #{val} but it was #{actual[camel_key]}"
      end
    end
  end
end
