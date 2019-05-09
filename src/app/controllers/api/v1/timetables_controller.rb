require 'time'
require 'date'

class Api::V1::TimetablesController < ApplicationController

  def index(datetime=DateTime.now.to_s, limit=5)
    @date = Date.parse(datetime)
    @time = Time.parse(datetime)
    @limit = limit

    @course = Course.find_by(departure_id: params[:from], arrival_id: params[:to])

    @timetables = DateSet.find_by(date: @date).timetable_set.timetables.where("course_id = ? AND departure_time >= ?", @course.id, @time ).limit(@limit)

    render json: { success: true, timetable: @timetables, course: JSON.parse(@course.to_json(:include => [:arrival, :departure]) ) }, status: :ok
  end

  private

  def get_timetable_params(params)
    params.permit(:key, :from, :to, :datetime, :limit)
  end

end
