class Position # A virtual model
  def self.all
    Stock
      .joins(:purchases)
      .having('COUNT(purchases.id) > 0')
      .group(:id)
  end
end