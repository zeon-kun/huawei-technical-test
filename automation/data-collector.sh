#!/bin/sh

source ../.env
DATA_PATH="$AUTOMATION_DATA_PATH"

mkdir -p "$DATA_PATH"

DATE=$(date +%m%d%Y)
TIME=$(date +%H.%M)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

FILENAME="cron_${DATE}_${TIME}.csv"
FILEPATH="${DATA_PATH}/${FILENAME}"

CPU=$(top -bn1 | grep "CPU:" | awk '{print $2}' | cut -d'%' -f1)
MEMORY=$(free | grep Mem | awk '{printf "%.2f", ($3/$2) * 100}')
DISK=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

CPU=${CPU:-0}
MEMORY=${MEMORY:-0}
DISK=${DISK:-0}

echo "timestamp,cpu_usage,memory_usage,disk_usage,network_in,network_out,active_connections,response_time" > "$FILEPATH"
echo "${TIMESTAMP},${CPU},${MEMORY},${DISK}" >> "$FILEPATH"

# Log
echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Collected: ${FILENAME}"