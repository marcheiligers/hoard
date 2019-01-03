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

FactoryBot.define do
  factory :stock do
    symbol { 'CIM' }
    name  { 'Chimera Investment Corporation' }
    annual_dividends { 4 }
    heart { false }
    star { false }
  end
end
