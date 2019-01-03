require 'test_helper'

# Virtual model
class PositionTest < ActiveSupport::TestCase
  test "fetches stock I hold a position in" do
    stocks = create_pair(:stock)
    create(:purchase, stock: stocks.first)
    create(:purchase, stock: stocks.first)
    assert_equal stocks.first.id, Position.all.first.id
  end
end
