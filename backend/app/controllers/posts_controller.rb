class PostsController < ApplicationController
  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    @post = Post.find(params[:id].to_i)
    render json: @post
  end

  def create
    @user = User.find_or_create_by(username:params[:username])

    @post = Post.create(title:params[:title], description:params[:description], reward:params[:reward], contact:params[:contact], deadline:params[:deadline], location:params[:location], user_id: @user.id)
    render json: @post
  end

  def update
  end

  def delete
  end
end
