#!/bin/bash
set -e

if [ $RAILS_ENV = 'production' ]; then
  RAILS_ENV=production bundle exec whenever --update-crontab
  service cron start
else
  bundle install
fi

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
