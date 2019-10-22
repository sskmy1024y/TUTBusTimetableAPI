class AddIsLastToTimetables < ActiveRecord::Migration[5.2]
  def change
    add_column :timetables, :is_last, :boolean, default: false, null: false
  end
end
