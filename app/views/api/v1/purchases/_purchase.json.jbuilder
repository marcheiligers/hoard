json.extract! purchase, :id, :stock_id, :order_type, :executed_at, :price, :shares, :created_at, :updated_at
json.url api_v1_purchase_url(purchase)
