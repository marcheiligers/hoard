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
  test "cannot be destroyed with a trade history" do
    stock = create(:stock)
    assert stock.destroy

    trade = create(:trade)
    assert_raises { trade.stock.destroy }
  end

  test '#shares_owned' do
    stock = create(:stock)
    create(:trade, stock: stock, shares: 5)
    create(:trade, stock: stock, shares: 6)

    assert_equal 11, stock.shares_owned
  end

  test '#total_trade_price' do
    stock = create(:stock)
    create(:trade, stock: stock, shares: 5, price: 1.0)
    create(:trade, stock: stock, shares: 5, price: 2.0)

    assert_equal 15.0, stock.total_trade_price
  end

  test '#average_trade_price' do
    stock = create(:stock)
    create(:trade, stock: stock, shares: 5, price: 1.0)
    create(:trade, stock: stock, shares: 5, price: 2.0)

    assert_equal 1.5, stock.average_trade_price
  end

  test 'the stock factory does what I expect' do
    skip 'Just making sure this loops through the list of real stocks I provided'
    20.times { puts build(:stock).inspect }
  end
end
