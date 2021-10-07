require 'rails_helper'

RSpec.describe 'Api::V1::UsersRequest', type: :request do
  describe 'GET /api/v1/users#show' do
    before do
      @user = FactoryBot.create(:user)
      @auth_tokens = sign_in(@user)
      get api_v1_user_path(@user.id), headers: @auth_tokens
      @json = JSON.parse(response.body)
    end

    it 'HTTPレスポンス200を返すこと' do
      expect(response).to have_http_status(200)
    end

    it '1件のユーザー情報を読み出すこと' do
      expect(@json.length).to eq 4
    end

    it '読み出したユーザーデータが正しいこと' do
      expect(@json['user']['id']).to eq @user.id
      expect(@json['user']['name']).to eq @user.name
      expect(@json['user']['email']).to eq @user.email
      expect(@json['user']['age']).to eq @user.age
      expect(@json['user']['self_introduction']).to eq @user.self_introduction
    end
  end

  describe 'PUT /api/v1/users#update' do
    before do
      @user = FactoryBot.create(:user)
      put api_v1_user_path(@user.id, params: { name: 'edit name', age: '30', self_introduction: 'edit introduction' })
    end

    it 'HTTPレスポンス200を返すこと' do
      expect(response).to have_http_status(200)
    end

    it '変更内容が正常に保存されていること' do
      json = JSON.parse(response.body)
      expect(json['name']).to eq 'edit name'
      expect(json['age']).to eq 30
      expect(json['self_introduction']).to eq 'edit introduction'
    end
  end

  describe 'DELETE api/v1/users#destroy' do
    before do
      @user = FactoryBot.create(:user)
    end

    it 'HTTPレスポンス200を返すこと' do
      delete api_v1_user_path(@user.id)
      expect(response).to have_http_status(200)
    end

    it 'ユーザーが正常に削除されていること' do
      expect { delete api_v1_user_path(@user.id) }.to change(User, :count).by(-1)
    end
  end
end
