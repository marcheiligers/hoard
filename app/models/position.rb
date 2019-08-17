class Position # A virtual model
  def self.all
    Stock
      .joins(:trades)
      .having('COUNT(trades.id) > 0')
      .group(:id)
  end
end