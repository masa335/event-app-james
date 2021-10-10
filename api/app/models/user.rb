# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :events, dependent: :destroy
  has_many :memberships, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :participating_events, through: :memberships, source: :event
  has_many :active_relationships, class_name: 'Relationship', foreign_key: :followed_id, dependent: :destroy
  has_many :followings, through: :active_relationships, source: :follower
  has_many :passive_relationships, class_name: 'Relationship', foreign_key: :follower_id, dependent: :destroy
  has_many :followers, through: :passive_relationships, source: :followed

  mount_uploader :image, AvaterUploader # CarrierWaveで作ったクラスと紐付ける

  validates :name, presence: true, length: { maximum: 50 }
  validates :age, length: { maximum: 3 }, numericality: { only_integer: true, allow_nil: true }
  validates :self_introduction, length: { maximum: 200 }

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User
end
