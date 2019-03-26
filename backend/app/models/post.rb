class Post < ApplicationRecord
  belongs_to :user
  # enum specialty: [:tech, :labor, :food, :school, :conversation, :fashion, :miscellaneous]
end
