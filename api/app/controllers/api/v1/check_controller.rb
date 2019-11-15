require 'nokogiri'
require 'open-uri'
require 'digest/md5'

class Api::V1::CheckController < ApplicationController
  before_action :basic_auth
  protect_from_forgery

  def index
    result = Cron::DetectTimetableChanges.batch
    case result['code']
    when 200
      success(result.delete("code"))
    when 204
      no_detected_update
    when 400
      bad_request(result.delete("code"))
    when 500
      internal_error(result.delete("code"))
    end

  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV.fetch('BASIC_AUTH_NAME', 'admin') && password == ENV.fetch('BASIC_AUTH_PASSWORD', 'root')
    end
  end

  def success(data)
    render json: data, status: :ok
  end

  def no_detected_update
    render status: :no_content
  end

  def bad_request(data)
    render json: data, status: :bad_request
  end

  def internal_error(error_str)
    render json: { success: false, data: error_str }, status: :internal
  end

end
