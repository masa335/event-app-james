require 'rails_helper'

RSpec.describe 'Api::V1::EventsRequest', type: :request do
  describe 'GET /api/v1/events#index' do
    before do
      @user = FactoryBot.create(:user)
      @event = FactoryBot.create(:event, user_id: @user.id)
      @other_event = FactoryBot.create(:event, user_id: @user.id, event_name: 'other event')
      get api_v1_events_path
    end

    it 'HTTPレスポンス200を返すこと' do
      expect(response).to have_http_status(200)
    end

    it '全てのイベント情報を読み出すこと' do
      json = JSON.parse(response.body)
      expect(json.length).to eq 2
    end

    it '読み出したデータが正しいこと' do
      json = JSON.parse(response.body)
      expect(json[1]['event_name']).to eq @event.event_name
      expect(json[0]['event_name']).to eq @other_event.event_name
    end
  end

  describe 'GET /api/v1/events#show' do
    before do
      @user = FactoryBot.create(:user)
      @event = FactoryBot.create(:event, user_id: @user.id)
      @other_event = FactoryBot.create(:event, user_id: @user.id, event_name: 'other event')
    end

    it 'HTTPレスポンス200を返すこと' do
      get api_v1_event_path(@event.id)
      expect(response).to have_http_status(200)
    end

    it '1件のユーザー情報を読み出すこと' do
      get api_v1_event_path(@event.id)
      json = JSON.parse(response.body)
      expect(json.length).to eq 13
    end

    it '読み出したイベントが正しいこと' do
      get api_v1_event_path(@event.id)
      json = JSON.parse(response.body)
      expect(json['id']).to eq @event.id
      expect(json['event_name']).to eq @event.event_name
      expect(json['event_category']).to eq @event.event_category
      expect(json['prefecture_id']).to eq @event.prefecture_id
      expect(json['venue']).to eq @event.venue
      expect(json['explanation']).to eq @event.explanation
      expect(json['max_participants']).to eq @event.max_participants

      get api_v1_event_path(@other_event.id)
      json = JSON.parse(response.body)
      expect(json['id']).to eq @other_event.id
      expect(json['event_name']).to eq @other_event.event_name
    end
  end

  describe 'POST /api/v1/events#create' do
    before do
      @user = FactoryBot.create(:user)
      @event_attributes = FactoryBot.attributes_for(:event)
      @params = {
        user_id: @user.id,
        event_name: 'create event test',
        event_category: 0,
        prefecture_id: 46,
        venue: 'hoge studio',
        explanation: 'hoge',
        start_date: Time.local(2021, 10, 5, 21, 0, 0, 0),
        end_date: Time.local(2021, 10, 5, 23, 30, 0, 0),
        max_participants: 100
      }
    end

    it 'HTTPレスポンス200を返すこと' do
      post api_v1_events_path, params: @params
      expect(response).to have_http_status(200)
    end

    it 'イベントを作成できること' do
      expect { post api_v1_events_path, params: @params }.to change(Event, :count).by(1)
    end

    it '作成したイベントのデータが正しいこと' do
      post api_v1_events_path, params: @params
      json = JSON.parse(response.body)
      expect(json['user_id']).to eq @user.id
      expect(json['event_name']).to eq @params[:event_name]
      expect(json['event_category']).to eq @params[:event_category]
      expect(json['prefecture_id']).to eq @params[:prefecture_id]
      expect(json['venue']).to eq @params[:venue]
      expect(json['explanation']).to eq @params[:explanation]
      expect(json['max_participants']).to eq @params[:max_participants]
    end

    it '同時にメンバーシップも作成されること' do
      expect { post api_v1_events_path, params: @params }.to change(Membership, :count).by(1)
    end

    it '正しいメンバーシップが作成されていること' do
      post api_v1_events_path, params: @params
      json = JSON.parse(response.body)
      expect(json['user_id']).to eq Membership.first.user_id
      expect(json['id']).to eq Membership.first.event_id
    end
  end

  describe 'PUT /api/v1/events#update' do
    before do
      @user = FactoryBot.create(:user)
      @event = FactoryBot.create(:event, user_id: @user.id)
      @params = {
        user_id: @user.id,
        event_name: 'edit event test',
        event_category: 1,
        prefecture_id: 45,
        venue: 'edit studio',
        explanation: 'edit hoge',
        start_date: Time.local(2021, 10, 10, 21, 0, 0, 0),
        end_date: Time.local(2021, 10, 10, 23, 30, 0, 0),
        max_participants: 99
      }
    end

    it 'HTTPレスポンス200を返すこと' do
      put api_v1_event_path(@event.id, params: @params)
      expect(response).to have_http_status(200)
    end

    it '変更内容が正常に保存されていること' do
      put api_v1_event_path(@event.id, params: @params)
      json = JSON.parse(response.body)
      expect(json['user_id']).to eq @user.id
      expect(json['event_name']).to eq @params[:event_name]
      expect(json['event_category']).to eq @params[:event_category]
      expect(json['prefecture_id']).to eq @params[:prefecture_id]
      expect(json['venue']).to eq @params[:venue]
      expect(json['explanation']).to eq @params[:explanation]
      expect(json['max_participants']).to eq @params[:max_participants]
    end
  end

  describe 'DELETE /api/v1/events#destroy' do
    before do
      @user = FactoryBot.create(:user)
      @event = FactoryBot.create(:event, user_id: @user.id)
    end

    it 'HTTPレスポンス200を返すこと' do
      delete api_v1_event_path(@event.id)
      expect(response).to have_http_status(200)
    end

    it 'イベントが正常に削除されていること' do
      expect { delete api_v1_event_path(@event.id) }.to change(Event, :count).by(-1)
    end
  end
end
