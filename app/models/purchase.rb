class Purchase < ApplicationRecord
  belongs_to :stock

  validates :stock, presence: true

  TYPES = %w[trade rsu excercise]
  validates :order_type, inclusion: TYPES

  validates :executed_at, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates :shares, numericality: { only_integer: true, greater_than: 0 }
end
