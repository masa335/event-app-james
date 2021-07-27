class Api::V1::UsersController < ApplicationController
  # ユーザー情報取得(個別)
  def show
    user = User.find(params[:id])
    organized_events = user.events.joins(:user).select('events.*, users.name as organizer')
    participating_events = user.participating_events.joins(:user).select('events.*, users.name as organizer')
    is_followed = user.followers.exists?(id: current_api_v1_user.id)
    render json: {
      user: user,
      participating_events: participating_events,
      organized_events: organized_events,
      is_followed: is_followed
    }, status: :ok
  end

  def update
    user = User.find(params[:id])
    if user.update!(user_params)
      render json: user, status: :ok
    else
      render json: user.errors
    end
  end

  def follows
    user = User.find(params[:id])
    users = user.followings
    render json: users, status: :ok
  end

  def followers
    user = User.find(params[:id])
    users = user.followers
    render json: users, status: :ok
  end

  def follows_followers_count
    user = User.find(params[:id])
    follows_count = user.followings.count
    followers_count = user.followers.count
    render json: { follows: follows_count, followers: followers_count }, status: :ok
  end

  # def followed?
  #   user = User.find(params[:id])
  #   is_followed = user.followings.exists?(params[:follower_id])
  #   render json: is_followed, status: :ok
  # end

  private

  def user_params
    params.permit(:name, :age, :self_introduction, :image)
  end
end
