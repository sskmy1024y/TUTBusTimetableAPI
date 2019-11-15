class CreateDetectChangeTimetables < ActiveRecord::Migration[5.2]
  def change
    create_table :detect_change_timetables, id: false do |t|
      t.string :uuid, limit: 32, null: false, primary_key: true

      t.timestamps
    end
  end
end
