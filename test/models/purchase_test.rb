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

require 'test_helper'

class BuyTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
