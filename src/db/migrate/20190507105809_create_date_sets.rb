class CreateDateSets < ActiveRecord::Migration[5.2]
  def change
    create_table :date_sets do |t|
      t.date :date
      t.integer :timetable_set_id

      t.timestamps
    end
  end
end
