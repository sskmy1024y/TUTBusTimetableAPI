require 'date'

class Api::V1::PlacesController < ApplicationController

  def index
    @places = Place.all()
    render json: @places.to_json()
  end

  def available
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @course_ids = DateSet.find_by(date: @date).timetable_set.timetables.group(:course_id).select(:course_id)
    @places = []
    for c in @course_ids do
      @places.push( Course.find(c.course_id).departure )
      @places.push( Course.find(c.course_id).arrival )
    end
    @places = @places.uniq

    render json: @places.to_json()
  end

end
