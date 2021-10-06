require 'rails_helper'

RSpec.describe Membership, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:membership)).to be_valid
  end

  it 'is invalid without a user_id' do
    membership = FactoryBot.build(:membership, user_id: nil)
    membership.valid?
    expect(membership.errors[:user_id]).to include('ユーザーIDを入力してください')
  end

  it 'is invalid without a event_id' do
    membership = FactoryBot.build(:membership, event_id: nil)
    membership.valid?
    expect(membership.errors[:event_id]).to include('イベントIDを入力してください')
  end
end
