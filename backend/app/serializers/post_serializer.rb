class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :reward, :contact, :location, :user_id

  def user_id
    self.object.user.username
  end

end
