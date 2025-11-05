#!/bin/sh

source ../.env
DATA_PATH="$AUTOMATION_DATA_PATH"
RETENTION_DAYS="$AUTOMATION_RETENTION_AGE"

if [ ! -d "$DATA_PATH" ]; then
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Data directory not found"
    exit 0
fi

DELETED=0
TOTAL=0

for file in "$DATA_PATH"/cron_*.csv; do
    if [ -f "$file" ]; then
        TOTAL=$((TOTAL + 1))
        
        FILE_TIME=$(stat -c %Y "$file" 2>/dev/null || stat -f %m "$file" 2>/dev/null)
        CURRENT_TIME=$(date +%s)
        AGE_SECONDS=$((CURRENT_TIME - FILE_TIME))
        AGE_DAYS=$((AGE_SECONDS / 86400))
        
        if [ "$AGE_DAYS" -gt "$RETENTION_DAYS" ]; then
            rm -f "$file"
            echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Deleted: $(basename "$file") (${AGE_DAYS} days old)"
            DELETED=$((DELETED + 1))
        fi
    fi
done

if [ "$TOTAL" -eq 0 ]; then
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] No files to clean"
else
    echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Cleaned ${DELETED}/${TOTAL} files"
fi