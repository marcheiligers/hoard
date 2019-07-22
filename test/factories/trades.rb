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

FactoryBot.define do
  factory :trade do
    stock { create(:stock) }
    order_type  { Trade::TYPES.sample }
    executed_at { rand(360).days.ago }
    price { (rand * 200 - 100).round(5) }
    shares { rand(990) + 10 }
  end
end
