require 'rails_helper'

RSpec.describe Relationship, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:relationship)).to be_valid
  end

  it 'is invalid without a follower_id' do
    relationship = FactoryBot.build(:relationship, follower_id: nil)
    relationship.valid?
    expect(relationship.errors[:follower_id]).to include('follower_idを入力してください')
  end

  it 'is invalid without a followed_id' do
    relationship = FactoryBot.build(:relationship, followed_id: nil)
    relationship.valid?
    expect(relationship.errors[:followed_id]).to include('followed_idを入力してください')
  end

  it 'is invalid duplicate follower_id & followed_id' do
    relation = FactoryBot.create(:relationship)
    other_relation = FactoryBot.build(:relationship, followed_id: relation.followed_id, follower_id: relation.follower_id)
    other_relation.valid?
    expect(other_relation.errors[:follower_id]).to include('このfollower_idはすでに存在します')
  end
end
