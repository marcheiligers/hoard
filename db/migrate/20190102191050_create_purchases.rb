class CreatePurchases < ActiveRecord::Migration[5.2]
  def change
    create_table :purchases do |t|
      t.references :stock, foreign_key: true
      t.string :order_type
      t.datetime :executed_at
      t.decimal :price, precision: 15, scale: 10
      t.integer :shares

      t.timestamps
    end
  end
end
