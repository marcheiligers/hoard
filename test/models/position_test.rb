require 'test_helper'

# Virtual model
class PositionTest < ActiveSupport::TestCase
  test "fetches stocks I hold a position in" do
    stocks = create_pair(:stock)
    create(:trade, stock: stocks.first)
    create(:trade, stock: stocks.first)

    assert_equal 1, Position.all.length
    assert_equal stocks.first.id, Position.all.first.id
  end
end
