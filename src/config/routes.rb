Rails.application.routes.draw do
  # API
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end

  resources :weathers
end
