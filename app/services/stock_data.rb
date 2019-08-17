class StockData
  # API Docs: https://iexcloud.io/docs/api/
  Error = Class.new(StandardError)

  attr_reader :symbol

  BASE_URI = 'https://cloud.iexapis.com/stable/stock/'
  TOKEN = "token=#{ENV['IEX_PUBLIC_TOKEN']}"

  def initialize(symbol)
    @symbol = symbol
  end

  def quote
    @quote ||= get("quote")
  end

  def company
    @company ||= get("company")
  end

  def dividends(period = '2y')
    @dividends ||= get("dividends/#{period}")
  end

  def chart(range = '1d')
    @chart ||= get("chart/#{range}")
  end

  private

    def get(path)
      response = Faraday.get("#{BASE_URI}#{symbol}/#{path}?#{TOKEN}")
      raise Error.new(response.body) if response.status >= 400

      JSON.parse(response.body)
    end
end
