json.extract! stock, :id, :symbol, :name, :annual_dividends, :heart, :star,
                     :exchange, :website, :ceo, :sector, :industry, :employees,
                     :created_at, :updated_at
json.url api_v1_stock_url(stock)
