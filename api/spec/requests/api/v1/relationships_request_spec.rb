require 'rails_helper'

RSpec.describe 'Api::V1::RelationshipsRequest', type: :request do
  describe 'POST /api/v1/relationships#create' do
    before do
      @user = FactoryBot.create(:user)
      @other_user = FactoryBot.create(:user)
      @auth_tokens = sign_in(@user)
    end

    it 'HTTPレスポンス200を返すこと' do
      post api_v1_user_relationships_path(@other_user.id), headers: @auth_tokens
      expect(response).to have_http_status(200)
    end

    it 'フォローできること' do
      expect { post api_v1_user_relationships_path(@other_user.id), headers: @auth_tokens }.to change(Relationship, :count).by(1)
      expect(Relationship.first.follower_id).to eq @other_user.id
      expect(Relationship.first.followed_id).to eq @user.id
    end
  end

  describe 'DELETE /api/v1/relationships#destroy' do
    before do
      @user = FactoryBot.create(:user)
      @other_user = FactoryBot.create(:user)
      @auth_tokens = sign_in(@user)
      FactoryBot.create(:relationship, follower_id: @other_user.id, followed_id: @user.id)
    end

    it 'HTTPレスポンス200を返すこと' do
      delete api_v1_user_relationships_path(@other_user.id), headers: @auth_tokens
      expect(response).to have_http_status(200)
    end

    it 'フォロー解除できること' do
      expect { delete api_v1_user_relationships_path(@other_user.id), headers: @auth_tokens }.to change(Relationship, :count).by(-1)
      expect(Relationship.count).to eq 0
    end
  end
end
