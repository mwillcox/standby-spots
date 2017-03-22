require 'csv'


csv_text = File.read(Rails.root.join('db', 'seeds', 'parklets.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  s = Spot.new
  s.name = row['envista_project_name_full']
  s.type = 'Parklet'
  s.address = row['envista_intermediate_location_text']
  s.location = row['Location']
  s.save
end
puts "There are now #{Spot.count} rows in the transactions table"

csv_text2 = File.read(Rails.root.join('db', 'seeds', 'popos.csv'))
csv2 = CSV.parse(csv_text2, :headers => true, :encoding => 'ISO-8859-1')
csv2.each do |row|
  s = Spot.new
  s.name = row['NAME']
  s.type = 'Privately Owned Public Open Space'
  s.description = row['Descriptio']
  s.address = row['POPOS_ADDR']
  s.location = row['the_geom']
  s.save
end
puts "There are now #{Spot.count} rows in the transactions table"