class Position # A virtual model
  def self.all
    Stock
      .select('stocks.*, COUNT(purchases.id) AS purchases')
      .joins(:purchases)
      .having('COUNT(purchases.id) > 0')
      .group(:id)
  end
end