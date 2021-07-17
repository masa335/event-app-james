class Api::V1::UsersController < ApplicationController
  # ユーザー情報取得(個別)
  def show
    user = User.find(params[:id])
    organized_events = user.events
    participating_events = user.participating_events
    render json: {
      user: user,
      participating_events: participating_events,
      organized_events: organized_events
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

  private

  def user_params
    params.permit(:name, :age, :self_introduction, :image)
  end
end
