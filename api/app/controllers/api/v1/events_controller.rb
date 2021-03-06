class Api::V1::EventsController < ApplicationController
  def index
    # 参加人数を求めるサブクエリ
    participants_count_sql = Membership.select('count(id)').where('memberships.event_id = events.id').to_sql
    # EventsとUsersテーブルを内部結合して、必要なカラムをselect
    events = Event.joins(:user).select("events.*, users.name as organizer, (#{participants_count_sql}) as participants_count").order(id: 'DESC')
    render json: events, status: :ok
  end

  def show
    event = Event.find(params[:id])
    render json: event, status: :ok
  end

  def participants
    participants = User.joins(:memberships).where("memberships.event_id = #{params[:id]}")
    render json: participants, status: :ok
  end

  def search
    @keyword = params[:keyword]
    # 参加人数を求めるサブクエリ
    participants_count_sql = Membership.select('count(id)').where('memberships.event_id = events.id').to_sql

    if @keyword.present?
      @events = []
      @keyword.split(/[[:blank:]]+/).each do |keyword|
        next if keyword.blank?

        @events += Event.joins(:user)
                        .select("events.*, users.name as organizer, (#{participants_count_sql}) as participants_count")
                        .where('event_name LIKE(?) OR explanation LIKE(?)', "%#{keyword}%", "%#{keyword}%")
                        .order(id: 'DESC')
      end
      @events.uniq!
    else
      @events = Event.joins(:user).select("events.*, users.name as organizer, (#{participants_count_sql}) as participants_count").order(id: 'DESC')
    end
    render json: @events, status: :ok
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, status: :ok
    else
      render json: event.errors
    end
    # 同時にメンバーシップも作成する
    latest_event = Event.last
    user = User.find(params[:user_id])
    membership = user.memberships.build(event_id: latest_event.id)
    membership.save
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
      :user_id, :event_name, :event_category, :start_date, :end_date, :prefecture_id, :venue, :explanation, :image, :max_participants
    )
  end
end
