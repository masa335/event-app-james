class Api::V1::UsersController < ApplicationController
  # ユーザー情報取得(個別)
  def show
    user = User.find(params[:id])
    render json: user, status: :ok
  end
end
