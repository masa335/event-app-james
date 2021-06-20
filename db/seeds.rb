# イベント情報のサンプルデータ
user = User.first

3.times do |n|
  event = Event.new(
    user_id: user.id,
    event_name: "session#{n}",
    event_date: Time.zone.now,
    venue: "studio#{n}"
  )

  event.save!
end
