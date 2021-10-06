FactoryBot.define do
  factory :comment do
    comment 'MyComment'
    association :user
    association :event
  end
end
