class ApplicationController < ActionController::API
  before_action :skip_session
  include DeviseTokenAuth::Concerns::SetUserByToken

  private

  def skip_session
    request.session_options[:skip] = true
  end
end
