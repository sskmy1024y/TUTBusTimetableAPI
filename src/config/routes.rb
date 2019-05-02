Rails.application.routes.draw do
  # API用
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end
end
