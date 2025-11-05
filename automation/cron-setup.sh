#!/bin/bash

echo "Setting up automated data collection and cleaning system..."

sudo mkdir -p /home/cron
sudo chmod 755 /home/cron

sudo chmod +x data-collector.sh
sudo chmod +x data-cleaner.sh

crontab crontab.txt
