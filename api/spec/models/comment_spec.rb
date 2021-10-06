require 'rails_helper'

RSpec.describe Comment, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:comment)).to be_valid
  end

  it 'is invalid without a user_id' do
    comment = FactoryBot.build(:comment, user_id: nil)
    comment.valid?
    expect(comment.errors[:user_id]).to include('ユーザーIDを入力してください')
  end

  it 'is invalid without a event_id' do
    comment = FactoryBot.build(:comment, event_id: nil)
    comment.valid?
    expect(comment.errors[:event_id]).to include('イベントIDを入力してください')
  end
end
