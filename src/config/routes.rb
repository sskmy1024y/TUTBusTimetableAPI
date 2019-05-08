Rails.application.routes.draw do
  # API
  namespace :api do
    namespace :v1 do
      resources :timetables
    end
  end

  resources :register, only: [:index, :new, :create]
end
