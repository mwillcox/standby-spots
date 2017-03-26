class SpotsController < ApplicationController

  def index
    @spots = Spot.order('name ASC')
  end

end
