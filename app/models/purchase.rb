# == Schema Information
#
# Table name: purchases
#
#  id          :integer          not null, primary key
#  stock_id    :integer
#  order_type  :string
#  executed_at :datetime
#  price       :decimal(15, 10)
#  shares      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Purchase < ApplicationRecord
  belongs_to :stock

  validates :stock, presence: true

  TYPES = %w[trade rsu excercise]
  validates :order_type, inclusion: TYPES

  validates :executed_at, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :shares, numericality: { only_integer: true, greater_than: 0 }
end
