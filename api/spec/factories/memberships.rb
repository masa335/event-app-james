FactoryBot.define do
  factory :membership do
    association :user
    association :event
  end
end
