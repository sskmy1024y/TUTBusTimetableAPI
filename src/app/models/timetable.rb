class Timetable < ApplicationRecord
  belongs_to :course
  belongs_to :timetable_set
end
