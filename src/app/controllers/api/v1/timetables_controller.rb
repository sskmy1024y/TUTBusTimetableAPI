require 'time'
require 'date'

class Api::V1::TimetablesController < ApplicationController

  def index(datetime=DateTime.now.to_s)
    @date = params[:datetime] ? Date.parse(params[:datetime]) : Date.parse(datetime)
    @time = params[:datetime] ? Time.parse(params[:datetime]) : Time.parse(datetime)
    @limit = params[:limit] ? params[:limit] : 3

    if !params[:to].blank?
      @course = Course.find_by(arrival_id: params[:to])
    elsif  !params[:from].blank?
      @course = Course.find_by(departure_id: params[:from])
    else
      return render json: { success: false, errors: '' }, status: :unprocessable_entity
    end
    
    begin
      @timetables = DateSet.find_by(date: @date).timetable_set.timetables.where("course_id = ? AND departure_time >= ?", @course.id, @time ).limit(@limit)
      render json: { success: true, timetables: @timetables, course: JSON.parse(@course.to_json(:include => [:arrival, :departure]) ) }, status: :ok
    rescue => exception
      render json: { success: false, errors: '416 Range Not Satisfiable. Perhaps bus timetable is not defined in this date.' }, status: :requested_range_not_satisfiable  
    end
  rescue => e
    render json: { success: false, errors: '500 internal error. Please contact the administrator.' }, status: :internal
  end

  private

  def get_timetable_params(params)
    params.permit(:key, :from, :to, :datetime, :limit)
  end

end
