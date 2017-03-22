class CreateSpots < ActiveRecord::Migration[5.0]
  def change
    create_table :spots do |t|
      t.string :name
      t.string :type
      t.string :description
      t.string :address
      t.string :location

      t.timestamps
    end
  end
end
