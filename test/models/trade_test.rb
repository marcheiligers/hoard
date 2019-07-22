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

require 'test_helper'

class TradeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
