require 'time'
require 'date'

class StaticPagesController < ApplicationController
  def index
    render file: 'public/index.html', layout: false
  end
end
