class NewsController < ApplicationController
  def index
    render "register/news/index"
  end

  def new
    render "register/news/new"
  end
end
