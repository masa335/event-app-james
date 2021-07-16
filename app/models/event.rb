class Event < ApplicationRecord
  belongs_to :user
  mount_uploader :image, AvaterUploader # CarrierWaveで作ったクラスと紐付ける
end
