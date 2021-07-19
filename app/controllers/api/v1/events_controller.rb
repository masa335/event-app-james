class Api::V1::EventsController < ApplicationController
  def index
    events = Event.all
    render json: events, status: :ok
  end

  def show
    event = Event.find(params[:id])
    render json: event, status: :ok
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, status: :ok
    else
      render json: event.errors
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update!(event_params)
      render json: event, status: :ok
    else
      render json: event.errors
    end
  end

  def destroy
    event = Event.find(params[:id])
    if event.destroy
      render json: event, status: :ok
    else
      render json: event.errors
    end
  end

  private

  def event_params
    params.permit(
      :user_id, :event_name, :event_category, :start_date, :end_date, :prefecture_id, :venue, :explanation, :image
    )
  end
end
