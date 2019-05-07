Rails.application.routes.draw do
  # API
  namespace :api do
    namespace :v1 do
      resources :users
    end
  end

  resources :weathers, only: [:index, :new, :create]
end
