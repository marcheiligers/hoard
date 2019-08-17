class ChangeTradesSharesToDecimal < ActiveRecord::Migration[5.2]
  def change
    change_column :trades, :shares, :decimal, precision: 15, scale: 10
  end
end
