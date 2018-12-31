Rails.application.routes.draw do
  defaults format: :json do
    namespace :api do
      namespace :v1 do
        resources :stocks, only: %i[index show create update destroy]
        resources :companies, only: %i[show]
      end
    end
  end

  root to: 'home#index'
  get '*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
