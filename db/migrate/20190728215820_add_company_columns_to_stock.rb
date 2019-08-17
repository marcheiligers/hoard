class AddCompanyColumnsToStock < ActiveRecord::Migration[5.2]
  def change
    change_table :stocks do |t|
      t.string :exchange
      t.string :website
      t.string :ceo
      t.string :sector
      t.string :industry
      t.integer :employees
    end
  end
end
