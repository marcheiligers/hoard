class Api::V1::TradesController < Api::BaseController
  before_action :set_trade, only: %w[show update destroy]

  def index
    @trades = Trade.all
    @trades.where(stock_id: params[:stock_id]) if params[:stock_id]
  end

  def show
  end

  def create
    @trade = Trade.new(trade_params)

    if @trade.save
      render :show, status: :created, location: api_v1_trade_url(@trade)
    else
      render json: @trade.errors, status: :unprocessable_entity
    end
  end

  def update
    if @trade.update(trade_params)
      render :show, status: :ok, location: api_v1_trade_url(@trade)
    else
      render json: @trade.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @trade.destroy
    head :no_content
  end

  private
    def set_trade
      @trade = Trade.find(params[:id])
    end

    def trade_params
      params.require(:trade).permit(:stock_id, :order_type, :executed_at, :price, :shares)
    end
end
