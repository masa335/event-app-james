class Api::V1::RelationshipsController < ApplicationController
  def create
    follow = current_api_v1_user.active_relationships.build(follower_id: params[:user_id])
    if follow.save!
      render json: follow, status: :ok
    else
      render json: follow.errors
    end
  end

  def destroy
    follow = current_api_v1_user.active_relationships.find_by(follower_id: params[:user_id])
    if follow.destroy
      render json: follow, status: :ok
    else
      render json: follow.errors
    end
  end
end
