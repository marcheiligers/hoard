# == Schema Information
#
# Table name: dividends
#
#  id            :integer          not null, primary key
#  stock_id      :integer
#  paid_on       :datetime
#  exdividend_on :datetime
#  amount        :decimal(15, 10)
#  shares        :decimal(15, 10)
#  per_share     :decimal(15, 10)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Dividend < ApplicationRecord
  belongs_to :stock
  has_many :dividend_trades
end
