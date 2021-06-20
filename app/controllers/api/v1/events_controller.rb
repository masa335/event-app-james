class Api::V1::EventsController < ApplicationController
  def index
    events = Event.all

    render json: {
      events: events
    }, status: :ok
  end
end
