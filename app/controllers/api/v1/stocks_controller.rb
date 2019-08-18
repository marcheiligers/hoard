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
    @stock.fetch_additional_info

    if @stock.errors.empty? && @stock.save
      render :show, status: :created, location: api_v1_stock_url(@stock)
    else
      render json: { error: @stock.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def update
    if @stock.update(stock_params)
      render :show, status: :ok, location: api_v1_stock_url(@stock)
    else
      render json: { error: @stock.errors.full_messages.to_sentence }, status: :unprocessable_entity
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
end
