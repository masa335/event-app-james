# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :events
  has_many :memberships
  has_many :participating_events, through: :memberships, source: :event
  mount_uploader :image, AvaterUploader # CarrierWaveで作ったクラスと紐付ける
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
end
