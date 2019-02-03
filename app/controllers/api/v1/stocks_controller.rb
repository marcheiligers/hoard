class Api::V1::StocksController < Api::BaseController
  before_action :set_stock, only: %w[show update destroy]

  def index
    @stocks = Stock.all
  end

  def show
  end

  def create
    # TODO: Prevent duplicates being added
    # TODO: Add tests for catching if a duplicate is added
    @stock = Stock.new(stock_params)
    fetch_additional_info

    if @stock.save
      render :show, status: :created, location: api_v1_stock_url(@stock)
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  end

  def update
    if @stock.update(stock_params)
      render :show, status: :ok, location: api_v1_stock_url(@stock)
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @stock.destroy
    head :no_content
  end

  private
    def set_stock
      @stock = Stock.find(params[:id])
    end

    def stock_params
      params.require(:stock).permit(:symbol, :name, :annual_dividends, :heart, :star)
    end

    def fetch_additional_info
      # TODO: Threading to parallelize IEX API requests
      if @stock.name.blank?
        company = IEX::Resources::Company.get(@stock.symbol)
        @stock.name = company.company_name
      end

      if @stock.annual_dividends.blank?
        # TODO: Add tests for catching if the stocks don't pay dividends
        dividends = IEX::Resources::Dividends.get(@stock.symbol, '2y').map { |div| Date.parse(div.payment_date) }
        if dividends.length > 0
          year_ago = dividends.first - 360.days # sometimes there is an overlap by a couple of days
          @stock.annual_dividends = dividends.select { |date| date > year_ago }.size
        end
      end
    end
end
