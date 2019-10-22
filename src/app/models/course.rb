class Course < ApplicationRecord
  belongs_to :arrival, optional: true, :foreign_key => 'arrival_id', class_name: "Place"
  belongs_to :departure, optional: true, :foreign_key => 'departure_id', class_name: "Place"

end
