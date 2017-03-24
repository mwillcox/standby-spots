class SpotsController < ApplicationController

  def index
    @spots = Spot.all
    @hash = Gmaps4rails.build_markers(@spots) do |spot, marker|
      marker.lat spot.latitude
      marker.lng spot.longitude
      marker.infowindow spot.info_window
    end
  end

end
