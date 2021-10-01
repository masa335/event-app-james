Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :events do
        resource :memberships, only: [:create, :destroy]
        get :search, on: :collection
        get :participants, on: :collection
      end
      resources :users, only: [:show, :update, :destroy] do
        resource :relationships, only: [:create, :destroy]
        get :follows, on: :member
        get :followers, on: :member
        get :follows_followers_count, on: :member
      end
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: [:index]
      end
      get :health_check, to: "health_check#index"
    end
  end
end
