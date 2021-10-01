CarrierWave.configure do |config|
  # config.asset_host = 'http://192.168.10.2:3000'
  # config.storage = :file
  # config.cache_storage = :file
  config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory  = 'james-20211001-images'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1',   # アジアパシフィック(東京)を選択した場合
      path_style: true
    }
end
