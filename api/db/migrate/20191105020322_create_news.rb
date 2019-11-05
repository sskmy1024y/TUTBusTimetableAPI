class CreateNews < ActiveRecord::Migration[5.2]
  def change
    create_table :news do |t|
      t.string :title
      t.string :contents
      t.boolean :is_public, default: false

      t.timestamps
    end
  end
end
