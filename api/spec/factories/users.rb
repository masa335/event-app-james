FactoryBot.define do
  # devise関連のカラムは省略
  factory :user do
    name 'testUser'
    email 'test@example.com'
    password 'password'
    gender 0
    age 20
    self_introduction 'this is test user'
    admin false
  end
end
