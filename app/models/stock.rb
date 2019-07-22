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

class Stock < ApplicationRecord
  has_many :trades
  has_many :dividends

  before_destroy :ensure_no_trades

  def shares_owned
    trades.sum(&:shares)
  end

  def total_trade_price
    trades.sum { |trade| trade.price * trade.shares }
  end

  def average_trade_price
    total_trade_price / shares_owned # TODO: fix for sell trades
  end

  def fetch_additional_info
    # TODO: Threading to parallelize IEX API requests
    if self.name.blank?
      company = fetch_company
      self.name = company['companyName']
    end

    # if annual_dividends.blank?
    #   # TODO: Add tests for catching if the stocks don't pay dividends
    #   dividends = IEX::Resources::Dividends.get(symbol, '2y').map { |div| Date.parse(div.payment_date) }
    #   if dividends.length > 0
    #     year_ago = dividends.first - 360.days # sometimes there is an overlap by a couple of days
    #     annual_dividends = dividends.select { |date| date > year_ago }.size
    #   end
    # end
  end

  def price_paid_for_shares_owned_on(date)
    trades.select { |trade| trade.executed_at < date }.sum(&:total)
  end

  def shares_owned_on(date)
    trades.select { |trade| trade.executed_at < date }.sum(&:shares)
  end

  private
    def ensure_no_trades
      raise StandardError, 'Cannot destroy stock because it has a trade history' unless trades.blank?
    end

    def fetch_company
      JSON.parse(Faraday.get("https://cloud.iexapis.com/stable/stock/#{symbol}/company?token=#{ENV['IEX_PUBLIC_TOKEN']}").body)
    end
end