class AddColumnMaxParticipantsToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :max_participants, :integer
  end
end
