#!/bin/bash

set -e

PORT=1337
POLL_INTERVAL=1

export RUN_MIGRATIONS=true

echo "Starting app..."
npm run start &
APP_PID=$!

echo "Waiting for app to listen on localhost:$PORT (PID: $APP_PID)..."

# Wait until the port is open.
while ! nc -z localhost "$PORT" 2>/dev/null; do
    # Check if the process is still running.
    if ! kill -0 "$APP_PID" 2>/dev/null; then
        echo "Error: App exited before it started listening on port $PORT"
        exit 1
    fi
    sleep "$POLL_INTERVAL"
done

echo "Strapi is now listening on port $PORT. Sending SIGTERM..."
kill "$APP_PID"

# Wait for the process to exit.
wait "$APP_PID" 2>/dev/null || true

echo "Migrations complete."