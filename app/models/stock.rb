# == Schema Information
#
# Table name: stocks
#
#  id               :integer          not null, primary key
#  symbol           :string
#  name             :string
#  annual_dividends :integer
#  heart            :boolean
#  star             :boolean
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Stock < ApplicationRecord
  has_many :purchases

  before_destroy :ensure_no_purchases

  def shares_owned
    purchases.sum(&:shares) # TODO: subtract sales
  end

  def total_purchase_price
    purchases.sum { |purchase| purchase.price * purchase.shares }
  end

  def average_purchase_price
    total_purchase_price / shares_owned
  end

  private
    def ensure_no_purchases
      raise StandardError, 'Cannot destroy stock because it has a purchase history' unless purchases.blank?
    end
end
