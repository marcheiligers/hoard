class CreateDividendTrades < ActiveRecord::Migration[5.2]
  def change
    create_table :dividend_trades do |t|
      t.references :dividend
      t.references :trades
    end
  end
end
