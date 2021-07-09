class Api::V1::EventsController < ApplicationController
  def index
    events = if params[:user_id].nil?
               Event.all
             else
               Event.where(user_id: params[:user_id])
             end
    render json: events, status: :ok
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, status: :ok
    else
      render json: event.errors
    end
  end

  private

  def event_params
    params.permit(
      :user_id, :event_name, :event_category, :event_date, :prefecture_id, :venue, :explanation
    )
  end
end
