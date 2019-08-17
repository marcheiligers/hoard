require 'csv'

namespace :import do
  desc "Import dividend stocks from old spreadsheet"
  task dividend_stocks: :environment do
    CSV.foreach(File.expand_path('~/Temp/Budget/Dividend Stocks-Table 1.csv'), headers: true) do |row|
      break if blank_row?(row)

      stock = Stock.find_by(symbol: row['Stock Symbol'])
      if stock.nil?
        stock = Stock.new(symbol: row['Stock Symbol'])
        stock.fetch_additional_info
        stock.save
      end

      date = Date.parse(row["Purchase date"])
      price = row["Purchase price"]
      shares = row["Number of shares"]

      existing = stock.trades.detect { |trade| trade.executed_at == date }
      Trade.create(stock: stock, order_type: 'buy', executed_at: date, price: price, shares: shares) if existing.nil?
    end
  end

  desc "Import dividend payments from old spreadsheet"
  task dividend_payments: :environment do
    CSV.foreach(File.expand_path('~/Temp/Budget/Dividends-Table 1.csv'), headers: true) do |row|
      break if blank_row?(row)

      stock = Stock.find_by(symbol: row['Stock symbol'])

      date = Date.parse(row["Date"])
      amount = row["Amount"]

      existing = stock.dividends.detect { |div| div.paid_on == date }
      Dividend.create(stock: stock, paid_on: date, amount: amount, shares: stock.shares_owned_on(date)) if existing.nil?
    end
  end

  desc "Import dividend payments from old spreadsheet"
  task clear: :environment do
    Dividend.delete_all
    Trade.delete_all
    Stock.delete_all
  end

  desc "Import stocks and dividend payments from old spreadsheet"
  task all: :environment do
    Rake::Task["import:dividend_stocks"].invoke
    Rake::Task["import:dividend_payments"].invoke
  end

  def blank_row?(row)
    row.all? { |name, cell| cell.blank? }
  end
end
