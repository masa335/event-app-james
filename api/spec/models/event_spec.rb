require 'rails_helper'

RSpec.describe Event, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.build(:event)).to be_valid
  end

  it 'is invalid without a user_id' do
    event = FactoryBot.build(:event, user_id: nil)
    event.valid?
    expect(event.errors[:user_id]).to include('ユーザーIDを入力してください')
  end

  it 'is invalid without a event_name' do
    event = FactoryBot.build(:event, event_name: nil)
    event.valid?
    expect(event.errors[:event_name]).to include('イベント名を入力してください')
  end

  it 'is invalid with event_name length more than 50 characters' do
    event = FactoryBot.build(:event, event_name: 'a' * 51)
    event.valid?
    expect(event.errors[:event_name]).to include('イベント名は50文字以内で入力してください')
  end

  it 'is invalid with event_category other than half-angle numbers' do
    event = FactoryBot.build(:event, event_category: 'a')
    event.valid?
    expect(event.errors[:event_category]).to include('イベントカテゴリは半角数字で入力してください')
  end

  it 'is invalid without a start_date' do
    event = FactoryBot.build(:event, start_date: nil)
    event.valid?
    expect(event.errors[:start_date]).to include('開始時間を入力してください')
  end

  it 'is invalid without a end_date' do
    event = FactoryBot.build(:event, end_date: nil)
    event.valid?
    expect(event.errors[:end_date]).to include('終了時間を入力してください')
  end

  it 'is invalid with prefecture_id other than half-angle numbers' do
    event = FactoryBot.build(:event, prefecture_id: 'a')
    event.valid?
    expect(event.errors[:prefecture_id]).to include('都道府県IDは半角数字で入力してください')
  end

  it 'is invalid with prefecture_id more than 46' do
    event = FactoryBot.build(:event, prefecture_id: 47)
    event.valid?
    expect(event.errors[:prefecture_id]).to include('都道府県IDは46以下の値にしてください')
  end

  it 'is invalid without a max_participants' do
    event = FactoryBot.build(:event, max_participants: nil)
    event.valid?
    expect(event.errors[:max_participants]).to include('参加人数上限を入力してください')
  end

  it 'is invalid with max_participants other than half-angle numbers' do
    event = FactoryBot.build(:event, max_participants: 'a')
    event.valid?
    expect(event.errors[:max_participants]).to include('参加人数上限は半角数字で入力してください')
  end

  it 'is invalid with max_participants more than 100' do
    event = FactoryBot.build(:event, max_participants: 101)
    event.valid?
    expect(event.errors[:max_participants]).to include('参加人数上限は100以下の値にしてください')
  end
end
