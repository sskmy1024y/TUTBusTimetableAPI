class CreateTimetables < ActiveRecord::Migration[5.2]
  def change
    create_table :timetables do |t|
      t.integer :course_id
      t.integer :timetable_set_id
      t.time :arrival_time
      t.time :departure_time
      t.boolean :is_shuttle

      t.timestamps
    end
  end
end
