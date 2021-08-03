CarrierWave.configure do |config|
  config.asset_host = 'http://192.168.10.2:3000'
  config.storage = :file
  config.cache_storage = :file
end
