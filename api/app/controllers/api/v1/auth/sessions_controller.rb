class Api::V1::Auth::SessionsController < ApplicationController
  def index
    if current_api_v1_user
      memberships = current_api_v1_user.memberships
      render json: { status: 200, current_user: current_api_v1_user, memberships: memberships }
    else
      render json: { status: 500, message: 'ユーザーが存在しません' }
    end
  end
end
