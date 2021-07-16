class RemoveColumnToEvent < ActiveRecord::Migration[6.0]
  def change
    remove_column :events, :event_date, :datetime
  end
end
