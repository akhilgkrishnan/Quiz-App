# frozen_string_literal: true

require "sidekiq/web"

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount Sidekiq::Web, at: "/sidekiq"

  resource :sessions, only: %i[create destroy]
  resources :quiz, except: %i[new edit] do
    member do
      post :publish
    end
    resources :questions, only: %i[create show update destroy]
  end
  resources :attempt, param: :slug do
    member do
      get :show_quiz, path: "show-quiz"
      post :login
      post :create
    end
  end
  resources :report, only: [:index] do
    collection do
      get :generate_report
    end
  end

  get "/public/:slug", to: "attempt#validate_quiz"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
