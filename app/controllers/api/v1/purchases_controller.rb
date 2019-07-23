class Api::V1::PurchasesController < Api::BaseController
  before_action :set_purchase, only: %w[show update destroy]

  def index
    @purchases = Purchase.all
    @purchases.where(stock_id: params[:stock_id]) if params[:stock_id]
  end

  def show
  end

  def create
    @purchase = Purchase.new(purchase_params)

    if @purchase.save
      render :show, status: :created, location: api_v1_purchase_url(@purchase)
    else
      render json: @purchase.errors, status: :unprocessable_entity
    end
  end

  def update
    if @purchase.update(purchase_params)
      render :show, status: :ok, location: api_v1_purchase_url(@purchase)
    else
      render json: @purchase.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @purchase.destroy
    head :no_content
  end

  private
    def set_purchase
      @purchase = Purchase.find(params[:id])
    end

    def purchase_params
      params.require(:purchase).permit(:stock_id, :order_type, :executed_at, :price, :shares)
    end
end
