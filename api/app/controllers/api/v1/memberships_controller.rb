class Api::V1::MembershipsController < ApplicationController
  def create
    membership = current_api_v1_user.memberships.build(event_id: params[:event_id])
    if membership.save
      render json: membership, status: :ok
    else
      render json: membership.errors
    end
  end

  def destroy
    membership = Membership.find_by(event_id: params[:event_id], user_id: current_api_v1_user.id)
    if membership.destroy
      render json: membership, status: :ok
    else
      render json: membership.errors
    end
  end
end
