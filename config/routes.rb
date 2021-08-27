# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :sessions, only: [:create]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
