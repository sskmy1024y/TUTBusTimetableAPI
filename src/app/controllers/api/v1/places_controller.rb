require 'date'

class Api::V1::PlacesController < ApplicationController

  def index
    @places = Place.all().select(:id, :name)
    render json: {success: true, places: @places }, status: :ok
  rescue => e
    render json: {success: false, error: '500 Internal sever error. Please contact the administrator.' }, status: :internal
  end

  def available
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    dateset = DateSet.find_by(date: @date)
    if dateset
      @course_ids = DateSet.find_by(date: @date).timetable_set.timetables.group(:course_id).select(:course_id)
      @places = []
      for c in @course_ids do
        @places.push( Course.find(c.course_id).departure )
        @places.push( Course.find(c.course_id).arrival )
      end
      @places = @places.uniq

      render json: {success: true, places: @places}, status: :ok
    else
      render json: {success: true, places: []}, status: :ok
    end
  rescue => e
    render json: {success: false, error: '500 Internal sever error. Please contact the administrator.' }, status: :internal  
  end

end
