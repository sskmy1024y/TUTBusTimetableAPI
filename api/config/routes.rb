Rails.application.routes.draw do
  # API
  namespace :api do
    namespace :v1 do
      resources :timetables, only: [:index]
      resources :places, only: [:index]

      get '/places/available', to: 'places#available'
      get '/timetables/first', to: 'timetables#first'
      get '/timetables/last', to: 'timetables#last'
      get '/timetables/internal', to: 'timetables#internal'
      get '/timetables/internal/:search', to: 'timetables#internal'

      post '/check', to: 'check#index'
    end
  end

  root 'static_pages#index'
  
  resources :register, only: [:index, :new, :create]
  get '/register/reset', to: 'register#reset'
  post '/register/timetable_reset', to: 'register#timetable_reset'

  get '*path', to: 'static_pages#index'
end
