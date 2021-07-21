# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :events
  has_many :memberships
  has_many :participating_events, through: :memberships, source: :event
  has_many :active_relationships, class_name: 'Relationship', foreign_key: :followed_id
  has_many :followings, through: :active_relationships, source: :follower
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: :follower_id
  has_many :followers, through: :passive_relationships, source: :following
  mount_uploader :image, AvaterUploader # CarrierWaveで作ったクラスと紐付ける
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
end
