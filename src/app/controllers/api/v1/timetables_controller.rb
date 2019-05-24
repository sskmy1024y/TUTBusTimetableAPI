require 'time'
require 'date'

class Api::V1::TimetablesController < ApplicationController

  def index(datetime=DateTime.now.to_s)
    @date = params[:datetime] ? Date.parse(params[:datetime]) : Date.parse(datetime)
    @time = params[:datetime] ? Time.parse(params[:datetime]) : Time.parse(datetime)
    @limit = params[:limit] ? params[:limit] : 3

    if params[:from] && params[:to]
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(arrival_id: params[:to], departure_id: params[:from])
      if @course.blank?
        return render json: { success: false, errors: '416 Range Not Satisfiable. This course is not defined.' }, status: :requested_range_not_satisfiable
      end
    elsif !params[:to].blank?
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(arrival_id: params[:to])
    elsif  !params[:from].blank?
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(departure_id: params[:from])
    else
      return render json: { success: false, errors: '400 Bat Request. Please check require parameter.' }, status: :bad_request
    end
    
    begin
      @dateset = DateSet.find_by(date: @date)
      if @dateset
        @timetables = @dateset.timetable_set.timetables.where("course_id = ? AND departure_time >= ?", @course.id, @time ).select(:id, :course_id, :timetable_set_id, :arrival_time, :departure_time, :is_shuttle).limit(@limit)
      else
        @timetables = []
      end

      render json: { success: true, timetables: @timetables, course: JSON.parse(@course.to_json(:include => [{arrival: {only: [:id, :name]} }, {departure: {only: [:id, :name]} }]) ) }, status: :ok
    rescue => exception
      render json: { success: false, errors: '416 Range Not Satisfiable. Perhaps bus timetable is not defined in this date.' }, status: :requested_range_not_satisfiable  
    end
  rescue => e
    render json: { success: false, errors: '500 internal error. Please contact the administrator.' }, status: :internal
  end

  def first()
    expires_now
    
    if params[:from] && params[:to]
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(arrival_id: params[:to], departure_id: params[:from])
      if @course.blank?
        return render json: { success: false, errors: '416 Range Not Satisfiable. This course is not defined.' }, status: :requested_range_not_satisfiable
      end
    elsif !params[:to].blank?
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(arrival_id: params[:to])
    elsif  !params[:from].blank?
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(departure_id: params[:from])
    else
      return render json: { success: false, errors: '400 Bat Request. Please check require parameter.' }, status: :bad_request
    end

    begin
      @dateset = DateSet.find_by(date: Date.today)
      if @dateset
        @timetables = @dateset.timetable_set.timetables.where("course_id = ?", @course.id).order(:departure_time).select(:id, :course_id, :timetable_set_id, :arrival_time, :departure_time, :is_shuttle).first()
      else
        @timetables = []
      end
      
      render json: { success: true, timetables: @timetables, course: JSON.parse(@course.to_json(:include => [{arrival: {only: [:id, :name]} }, {departure: {only: [:id, :name]} }]) ) }, status: :ok
    rescue => exception
      render json: { success: false, errors: '416 Range Not Satisfiable. Perhaps bus timetable is not defined in this date.' }, status: :requested_range_not_satisfiable  
    end
  rescue => e
    render json: { success: false, errors: '500 internal error. Please contact the administrator.' }, status: :internal

  end

  def last()
    expires_now
    
    if params[:from] && params[:to]
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(arrival_id: params[:to], departure_id: params[:from])
      if @course.blank?
        return render json: { success: false, errors: '416 Range Not Satisfiable. This course is not defined.' }, status: :requested_range_not_satisfiable
      end
    elsif !params[:to].blank?
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(arrival_id: params[:to])
    elsif  !params[:from].blank?
      @course = Course.select(:id, :arrival_id, :departure_id).find_by(departure_id: params[:from])
    else
      return render json: { success: false, errors: '400 Bat Request. Please check require parameter.' }, status: :bad_request
    end

    begin
      @dateset = DateSet.find_by(date: Date.today)
      if @dateset
        @timetables = @dateset.timetable_set.timetables.where("course_id = ?", @course.id).order(:departure_time).select(:id, :course_id, :timetable_set_id, :arrival_time, :departure_time, :is_shuttle).last()
      else
        @timetables = []
      end
      
      render json: { success: true, timetables: @timetables, course: JSON.parse(@course.to_json(:include => [{arrival: {only: [:id, :name]} }, {departure: {only: [:id, :name]} }]) ) }, status: :ok
    rescue => exception
      render json: { success: false, errors: '416 Range Not Satisfiable. Perhaps bus timetable is not defined in this date.' }, status: :requested_range_not_satisfiable  
    end
  rescue => e
    render json: { success: false, errors: '500 internal error. Please contact the administrator.' }, status: :internal

  end

  def internal(datetime = DateTime.now.to_s)
    expires_now
    @date =  params[:datetime] ? Date.parse(params[:datetime]) : Date.parse(datetime)
    @time = params[:datetime] ? Time.parse(params[:datetime]) : Time.parse(datetime)
    @limit = params[:limit] ? params[:limit] : 2

    @timetables = []

    dateset = DateSet.find_by(date: @date)

    if dateset
      course_ids = DateSet.find_by(date: @date).timetable_set.timetables.group(:course_id).select(:course_id)
        
      for c in course_ids do
        @timetables << {
          departure: Course.find(c.course_id).departure,
          arrival: Course.find(c.course_id).arrival,
          timetables: dateset ? DateSet.find_by(date: @date).timetable_set.timetables.where("course_id = ? AND departure_time >= ?", c.course_id, @time ).limit(2) : []
        }
      end
      @timetables = @timetables.uniq
      for timetable in @timetable do
        timetable[:departure_time].strftime('%T')
      end
    end
    render json: { success: true, data: @timetables }, status: :ok
  rescue => e
    render json: { success: false, errors: '500 internal server error. Please contact the administrator.' }, status: :internal
  end

  private

  def get_timetable_params(params)
    params.permit(:key, :from, :to, :datetime, :limit)
  end

end
