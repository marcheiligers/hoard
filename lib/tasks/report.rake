require 'csv'

namespace :report do
  desc "Import dividend stocks from old spreadsheet"
  task dividends: :environment do
    Dividend.all.map do |dividend|
      price = dividend.stock.price_paid_for_shares_owned_on(dividend.paid_on)
      data = [
        dividend.stock.symbol.ljust(5),
        dividend.paid_on.strftime('%d %b %y'),
        sprintf('%0.02f', dividend.amount).rjust(8),
        dividend.shares.to_i.to_s.rjust(5),
        sprintf('%0.03f', dividend.amount / dividend.shares).rjust(8),
        sprintf('%0.02f', price).rjust(10),
        sprintf('%0.02f', dividend.amount / price * 100).rjust(6) # TODO: convert to annual
      ]
      puts data.join(' ')
    end
  end
end