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
    # @post = Post.create()
  end

  def update
  end

  def delete
  end
end
