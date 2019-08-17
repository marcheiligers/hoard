# == Schema Information
#
# Table name: trades
#
#  id          :integer          not null, primary key
#  stock_id    :integer
#  order_type  :string
#  executed_at :datetime
#  price       :decimal(15, 10)
#  shares      :decimal(15, 10)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Trade < ApplicationRecord
  belongs_to :stock

  # validates :stock_id, presence: true

  TYPES = %w[buy sale rsu excercise]
  validates :order_type, inclusion: TYPES

  validates :executed_at, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :shares, numericality: { other_than: 0 }

  def total
    price * shares
  end
end
