class Event < ApplicationRecord
  belongs_to :user
  has_many :memberships, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :user_id, presence: true
  validates :event_name, presence: true, length: { maximum: 50 }
  validates :event_category, numericality: { only_integer: true }
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :prefecture_id, numericality: { only_integer: true, less_than_or_equal_to: 46 }
  validates :max_participants, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 100 }

  mount_uploader :image, AvaterUploader # CarrierWaveで作ったクラスと紐付ける
end
