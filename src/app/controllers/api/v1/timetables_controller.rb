class Api::V1::TimetablesController < ApplicationController

  def index
    @timetables = TimetableSet..timetables.where("course_id = ? AND departure_time >= ?", [コース情報], Time.now ).limit(3)


    render json: { success: false }, status: :ok
  end
end
