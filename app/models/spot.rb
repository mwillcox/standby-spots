class Spot < ApplicationRecord
  geocoded_by :address
  after_validation :geocode

  def info_window
    if name === address
      "#{name} - #{description}"
    elsif description === nil
      "#{name} - #{address}"
    else
      "#{name}"
    end
  end
end
