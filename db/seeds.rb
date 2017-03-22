require 'csv'

parklets_csv_text = File.read(Rails.root.join('db', 'seeds', 'parklets.csv'))
parklets_csv = CSV.parse(parklets_csv_text, :headers => true, :encoding => 'ISO-8859-1')
parklets_csv.each do |row|
  s = Spot.new
  s.name = row['envista_project_name_full']
  s.park_type = 'Parklet'
  s.address = row['envista_intermediate_location_text']
  s.location = row['Location']
  s.save
end
puts "There are now #{Spot.count} rows in the transactions table"

popos_csv_text = File.read(Rails.root.join('db', 'seeds', 'popos.csv'))
popos_csv = CSV.parse(popos_csv_text, :headers => true, :encoding => 'ISO-8859-1')
popos_csv.each do |row|
  s = Spot.new
  s.name = row['NAME']
  s.park_type = 'Privately Owned Public Open Space'
  s.description = row['Descriptio']
  s.address = row['POPOS_ADDR']
  s.location = row['the_geom']
  s.save
end
puts "There are now #{Spot.count} rows in the transactions table"