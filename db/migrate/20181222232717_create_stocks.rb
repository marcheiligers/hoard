class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.string :name
      t.integer :annual_dividends
      t.boolean :heart
      t.boolean :star

      t.timestamps
    end
  end
end
