class NewsController < ApplicationController
  def index
    @news = News.all()
    render "register/news/index"
  end

  def new
    @news = News.new
    render "register/news/new"
  end

  def create
    News.create(news_params)

    redirect_to register_news_index_path
  end

  def edit
    @news = News.find(params[:id])
    render "register/news/edit"
  end

  def update
    post = News.find(params[:id])
    post.update(news_params)

    redirect_to register_news_index_path
  end

  def destroy
    post = News.find(params[:id])
    post.delete

    redirect_to register_news_index_path
  end

  private 

  def news_params
    params.require(:news).permit(:title, :contents)
  end
end
