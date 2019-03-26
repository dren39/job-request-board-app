class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :reward, :contact, :deadline, :location, :user_id
  
  def user_id
    self.object.user.username
  end
end
