Rails.application.routes.draw do
  defaults format: :json do
    namespace :api do
      namespace :v1 do
        resources :stocks, only: %i[index show create update destroy] do
          resources :purchases, only: %i[index show create update destroy], on: :member
        end
        resources :trades, only: %i[index show create update destroy]
        resources :companies, only: %i[show] do
          get 'chart(/:range?)', action: 'chart', on: :member, as: 'chart'
        end
      end
    end
  end

  root to: 'home#index'
  get '*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
