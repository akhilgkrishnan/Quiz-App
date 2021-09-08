# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
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
    end
  end
  get "/public/:slug", to: "attempt#validate_quiz"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
