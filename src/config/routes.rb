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
      get '/timetables/internal/last', to: 'timetables#internal_last'

    end
  end

  root 'static_pages#index'
  get 'api/v1/document', to: 'static_pages#document'
  get 'contact', to: 'static_pages#contact'
  
  namespace :admin do
    resources :register, only: [:index, :new, :create]
  end

end
