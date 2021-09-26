class Event < ApplicationRecord
  belongs_to :user
  has_many :memberships, dependent: :destroy
  mount_uploader :image, AvaterUploader # CarrierWaveで作ったクラスと紐付ける
end
