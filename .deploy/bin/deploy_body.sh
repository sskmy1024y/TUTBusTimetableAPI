#!/bin/bash

set -eux -o pipefail

echo $1 | sudo docker-compose stop
echo $1 | sudo docker-compose down
echo $1 | sudo docker-compose build
echo $1 | sudo docker-compose up -d

