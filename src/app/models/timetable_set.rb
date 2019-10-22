class TimetableSet < ApplicationRecord
  has_many :timetables
  has_many :date_sets
end
