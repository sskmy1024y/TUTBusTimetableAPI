class Course < ApplicationRecord
  belongs_to :place, foreign_key: 'arrival_id'
  belongs_to :place, foreign_key: 'departure_id'
end
