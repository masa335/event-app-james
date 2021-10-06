FactoryBot.define do
  factory :user do
    name 'testUser'
    sequence(:email) { |n| "tester#{n}@example.com" }
    password 'password'
    gender 0
    age 20
    self_introduction 'this is test user'
    admin false
  end
end
