class CreateDividends < ActiveRecord::Migration[5.2]
  def change
    create_table :dividends do |t|
      t.references :stock
      t.datetime :paid_on
      t.datetime :exdividend_on
      t.decimal :amount, precision: 15, scale: 10
      t.decimal :shares, precision: 15, scale: 10
      t.decimal :per_share, precision: 15, scale: 10
      t.timestamps
    end
  end
end
