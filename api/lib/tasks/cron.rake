namespace :cron do
  desc "時刻表掲載ページに更新がないか確認するタスク"
  task detect_timetable_changes: :environment do
    Cron::DetectTimetableChanges.batch
  end
end
