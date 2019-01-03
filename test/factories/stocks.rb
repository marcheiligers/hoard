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
  stocks = [
    ['Chimera Investment Corporation', 'CIM'],
    ['NextEra Energy Partners', 'NEP'],
    ['Pennsylvania REIT', 'PEI'],
    ['Annaly Capital Management', 'NLY'],
    ['RLJ Lodging Trust', 'RLJ-PA'],
    ['Stone Harbor Emerging Markets Income Fund', 'EDF'],
    ['Stone Harbor Emerging Markets Total Income Fund', 'EDI'],
    ['IQ Global Agribusiness Small Cap ETF', 'CROP'],
    ['Innovative Industrial Properties', 'IIPR'],
    ['Harvest Capital Credit Corp.', 'HCAP'],
    ['Ladder Capital Corp', 'LADR'],
    ['UMH Properties, Inc.', 'UMH']
  ]
  stock_index = 0
  annual_dividends = [ nil, 1, 4, 6, 12 ]

  factory :stock do
    symbol { stocks[stock_index % stocks.length].last }
    name  { stocks[stock_index % stocks.length].first }
    annual_dividends { annual_dividends.sample }
    heart { rand(10) >= 5 }
    star { rand(10) >= 5 }

    after(:build) { stock_index += 1 }
  end
end
