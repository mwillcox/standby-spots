class ChangeTypeColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :spots, :type, :park_type
  end
end
