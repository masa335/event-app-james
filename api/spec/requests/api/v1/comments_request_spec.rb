require 'rails_helper'

RSpec.describe 'Api::V1::CommentsRequest', type: :request do
  describe 'GET /api/v1/comments#show' do
    before do
      @user = FactoryBot.create(:user)
      @event = FactoryBot.create(:event, user_id: @user.id)
      @comment = FactoryBot.create(:comment, event_id: @event.id)
    end

    it 'HTTPレスポンス200を返すこと' do
      get api_v1_event_comments_path(@event.id)
      expect(response).to have_http_status(200)
    end

    it '指定したイベントの全てのコメントを読み出すこと' do
      other_comment = FactoryBot.create(:comment, event_id: @event.id)
      get api_v1_event_comments_path(@event.id)
      json = JSON.parse(response.body)
      expect(json.length).to eq 2
      expect(json[0]['event_id']).to eq @comment.event_id
      expect(json[1]['event_id']).to eq other_comment.event_id
    end

    it '読み出したデータが正しいこと、昇順で取り出せること' do
      other_comment = FactoryBot.create(:comment, event_id: @event.id, comment: 'other comment')
      get api_v1_event_comments_path(@event.id)
      json = JSON.parse(response.body)
      expect(json[0]['comment']).to eq @comment.comment
      expect(json[1]['comment']).to eq other_comment.comment
    end
  end

  describe 'POST /api/v1/comments#create' do
    before do
      @user = FactoryBot.create(:user)
      @auth_tokens = sign_in(@user)
      @event = FactoryBot.create(:event, user_id: @user.id)
    end

    it 'HTTPレスポンス200を返すこと' do
      post api_v1_event_comments_path(@event.id), headers: @auth_tokens
      expect(response).to have_http_status(200)
    end

    it 'コメントが投稿できること' do
      expect {
        post api_v1_event_comments_path(@event.id), params: { comment: 'test' }, headers: @auth_tokens
      }.to change(Comment, :count).by(1)
    end

    it '投稿したコメントが正しいこと' do
      post api_v1_event_comments_path(@event.id), params: { comment: 'test' }, headers: @auth_tokens
      json = JSON.parse(response.body)
      expect(json['event_id']).to eq @event.id
      expect(json['comment']).to eq 'test'
    end
  end

  describe 'DELETE /api/v1/comments#destroy' do
    before do
      @user = FactoryBot.create(:user)
      @event = FactoryBot.create(:event, user_id: @user.id)
      @comment = FactoryBot.create(:comment, event_id: @event.id)
    end

    it 'HTTPレスポンス200を返すこと' do
      delete api_v1_comment_path(@comment.id)
      expect(response).to have_http_status(200)
    end

    it 'コメントが削除されること' do
      expect { delete api_v1_comment_path(@comment.id) }.to change(Comment, :count).by(-1)
      expect(Comment.count).to eq 0
    end

    it '指定したコメントが削除されること' do
      other_comment = FactoryBot.create(:comment, event_id: @event.id)
      delete api_v1_comment_path(other_comment.id)
      expect(Comment.count).to eq 1
      expect(Comment.first.id).to eq @comment.id
    end
  end
end
