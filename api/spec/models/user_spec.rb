require 'rails_helper'

RSpec.describe User, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:user)).to be_valid
  end

  it 'is invalid without a name' do
    user = FactoryBot.build(:user, name: nil)
    user.valid?
    expect(user.errors[:name]).to include('名前を入力してください')
  end

  it 'is invalid without a email' do
    user = FactoryBot.build(:user, email: nil)
    user.valid?
    expect(user.errors[:email]).to include('メールを入力してください')
  end

  it 'is invalid with duplicate email address' do
    user = FactoryBot.create(:user)
    other_user = FactoryBot.build(:user, email: user.email)
    other_user.valid?
    expect(other_user.errors[:email]).to include('このメールはすでに存在します')
  end

  it 'is invalid with name length more than 50 characters' do
    user = FactoryBot.build(:user, name: 'a' * 51)
    user.valid?
    expect(user.errors[:name]).to include('名前は50文字以内で入力してください')
  end

  it 'is invalid with age length more than 3 characters' do
    user = FactoryBot.build(:user, age: 9999)
    user.valid?
    expect(user.errors[:age]).to include('年齢は3文字以内で入力してください')
  end

  it 'is invalid with age other than half-angle numbers' do
    user = FactoryBot.build(:user, age: 'a')
    user.valid?
    expect(user.errors[:age]).to include('年齢は半角数字で入力してください')
  end

  it 'is invalid with self_introduction length more than 200 characters' do
    user = FactoryBot.build(:user, self_introduction: 'a' * 201)
    user.valid?
    expect(user.errors[:self_introduction]).to include('自己紹介は200文字以内で入力してください')
  end
end
