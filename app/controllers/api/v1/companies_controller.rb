class Api::V1::CompaniesController < Api::BaseController
  def show
    stock_data = StockData.new(params[:id]) # symbol

    quote = nil
    quote_thread = Thread.new { quote = stock_data.quote }

    company = nil
    company_thread = Thread.new { company = stock_data.company }

    [quote_thread, company_thread].map(&:join)

    render json: company.to_h.merge(quote.to_h)
  end

  def chart
    stock_data = StockData.new(params[:id]) # symbol

    range = params[:range].blank? || params[:range] == 'today' ? '1d' : params[:range]
    data = stock_data.chart(range)

    render json: data
  end
end
