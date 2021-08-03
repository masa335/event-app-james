class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references  :user, null: false, foreign_key: true
      t.string      :event_name, null: false
      t.string      :event_category
      t.datetime    :event_date
      t.integer     :prefecture_id
      t.string      :venue
      t.text        :explanation

      t.timestamps
    end
  end
end
