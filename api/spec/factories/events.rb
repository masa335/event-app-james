FactoryBot.define do
  factory :event do
    event_name 'test event'
    event_category '0'
    prefecture_id '46'
    venue 'hoge studio'
    explanation 'hoge'
    start_date Time.local(2021, 10, 5, 21, 0, 0, 0)
    end_date Time.local(2021, 10, 5, 23, 30, 0, 0)
    max_participants 100
    association :user
  end
end
