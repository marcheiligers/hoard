class Api::V1::CompaniesController < Api::BaseController
  def show
    symbol = params[:id]

    quote = nil
    quote_thread = Thread.new { quote = IEX::Resources::Quote.get(symbol) }

    company = nil
    company_thread = Thread.new { company = IEX::Resources::Company.get(symbol) }

    [quote_thread, company_thread].map(&:join)

    render json: company.to_h.merge(quote.to_h)
  end
end