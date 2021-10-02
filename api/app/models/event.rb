class Event < ApplicationRecord
  belongs_to :user
  has_many :memberships, dependent: :destroy
  has_many :comments, dependent: :destroy
  mount_uploader :image, AvaterUploader # CarrierWaveで作ったクラスと紐付ける
end
