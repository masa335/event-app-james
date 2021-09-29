class ChangeColumnEventCategoryToEvents < ActiveRecord::Migration[6.0]
  # 変更内容
  def up
    change_column :events, :event_category, :integer
  end

  # 変更前の状態
  def down
    change_column :events, :event_category, :string
  end
end
