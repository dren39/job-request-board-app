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
    @post = Post.create(post_params.merge({user_id: @user.id}))
    render json: @post
  end

  def update
    @posts = Post.all
    @user = User.find_or_create_by(username:params[:username])
    @post = Post.find(params[:id])
    @post.update(post_params.merge({user_id: @user.id}))
    render json: @posts
  end

  def destroy
    @posts = Post.all
    @post = Post.find(params[:id])
    @post.destroy
    render json: @posts
  end

  private
  def post_params
    params.require(:post).permit(:title, :description, :reward, :location, :contact)
  end
end
