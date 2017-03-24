class ChangeLocationFields < ActiveRecord::Migration[5.0]
  def change
    add_column :spots, :latitude, :float
    add_column :spots, :longitude, :float
    remove_column :spots, :location
  end
end
