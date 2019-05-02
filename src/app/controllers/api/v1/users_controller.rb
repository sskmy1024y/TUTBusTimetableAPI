class Api::V1::UsersController < ApplicationController

  def index
    render json: { success: false }, status: :ok
  end
end
