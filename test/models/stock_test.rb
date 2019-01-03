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

require 'test_helper'

class StockTest < ActiveSupport::TestCase
  test "cannot be destroyed with a purchase history" do
    stock = create(:stock)
    assert stock.destroy

    purchase = create(:purchase)
    assert_raises { purchase.stock.destroy }
  end

  test 'the stock factory does what I expect' do
    skip 'Just making sure this loops through the list of real stock I provided'
    20.times { puts build(:stock).inspect }
  end
end
