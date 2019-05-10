Rails.application.routes.draw do
  # API
  namespace :api do
    namespace :v1 do
      resources :timetables
      resources :places, only: [:index]
    end
  end

  root 'static_pages#index'
  resources :register, only: [:index, :new, :create]
end
