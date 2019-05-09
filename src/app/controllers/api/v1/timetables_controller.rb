require 'time'
require 'date'

class Api::V1::TimetablesController < ApplicationController

  def index(datetime=DateTime.now.to_s)
    @date = Date.parse(datetime)
    @time = Time.parse(datetime)
    @limit = params[:limit] ? params[:limit] : 3

    if !params[:to].blank?
      @course = Course.find_by(arrival_id: params[:to])
    elsif  !params[:from].blank?
      @course = Course.find_by(departure_id: params[:from])
    else
      return render json: { success: false, errors: '' }, status: :unprocessable_entity
    end
    
    @timetables = DateSet.find_by(date: @date).timetable_set.timetables.where("course_id = ? AND departure_time >= ?", @course.id, @time ).limit(@limit)

    render json: { success: true, timetables: @timetables, course: JSON.parse(@course.to_json(:include => [:arrival, :departure]) ) }, status: :ok
  end

  private

  def get_timetable_params(params)
    params.permit(:key, :from, :to, :datetime, :limit)
  end

end
