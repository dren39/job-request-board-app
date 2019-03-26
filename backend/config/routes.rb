Rails.application.routes.draw do
  # get 'users/create'
  # get 'posts/index'
  # get 'posts/create'
  # get 'posts/update'
  # get 'posts/delete'
  resources :users, only: :create
  resources :posts, only: [:index, :show, :create, :update, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
