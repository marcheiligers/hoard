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

  private
    def ensure_no_purchases
      raise StandardError, 'Cannot destroy stock because it has a purchase history' unless purchases.blank?
    end
end
