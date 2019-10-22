class CreateTimetableSets < ActiveRecord::Migration[5.2]
  def change
    create_table :timetable_sets do |t|
      t.string :name
      t.timestamps
    end
  end
end
