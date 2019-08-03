require 'date'
require 'time'
require 'json'
require 'nokogiri'
require 'open-uri'

class AdminController < ApplicationController
  before_action :basic_auth
  protect_from_forgery with: :exception

  layout 'admin'

  def index

  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV.fetch('BASIC_AUTH_NAME', 'admin') && password == ENV.fetch('BASIC_AUTH_PASSWORD', 'root')
    end
  end
end
