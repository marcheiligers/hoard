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

FactoryBot.define do
  factory :purchase do
    stock { create(:stock) }
    order_type  { 'trade' }
    executed_at { 4.days.ago }
    price { 1.01 }
    shares { 10 }
  end
end
