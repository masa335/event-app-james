require 'rails_helper'

RSpec.describe 'Api::V1::MembershipsRequest', type: :request do
  describe 'POST /api/v1/memberships#create' do
    before do
      @user = FactoryBot.create(:user)
      @other_user = FactoryBot.create(:user)
      @auth_tokens = sign_in(@user)
      @event = FactoryBot.create(:event, user_id: @other_user.id)
    end

    it 'HTTPレスポンス200を返すこと' do
      post api_v1_event_memberships_path(@event.id), headers: @auth_tokens
      expect(response).to have_http_status(200)
    end

    it 'イベントに参加できること' do
      expect { post api_v1_event_memberships_path(@event.id), headers: @auth_tokens }.to change(Membership, :count).by(1)
      expect(Membership.first.user_id).to eq @user.id
    end
  end

  describe 'DELETE /api/v1/memberships#destroy' do
    before do
      @user = FactoryBot.create(:user)
      @other_user = FactoryBot.create(:user)
      @auth_tokens = sign_in(@user)
      @event = FactoryBot.create(:event, user_id: @other_user.id)
      FactoryBot.create(:membership, user_id: @user.id, event_id: @event.id)
    end

    it 'HTTPレスポンス200を返すこと' do
      delete api_v1_event_memberships_path(@event.id), headers: @auth_tokens
      expect(response).to have_http_status(200)
    end

    it 'イベント参加を取り消しできること' do
      expect { delete api_v1_event_memberships_path(@event.id), headers: @auth_tokens }.to change(Membership, :count).by(-1)
      expect(Membership.count).to eq 0
    end
  end
end
