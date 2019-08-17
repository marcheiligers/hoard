class RenamePurchasesToTrades < ActiveRecord::Migration[5.2]
  def change
    rename_table :purchases, :trades
  end
end
