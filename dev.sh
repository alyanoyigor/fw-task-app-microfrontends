#!/bin/bash

# Define folders and their respective ports
declare -A folders
folders=(["shell"]=6060 ["task-list"]=6061 ["task-editor"]=6062 ["auth"]=6063)

# Function to check if a port is in use
is_port_in_use() {
  local port=$1
  if lsof -i:$port &> /dev/null; then
    return 0 # Port is in use
  else
    return 1 # Port is not in use
  fi
}

# Function to start a server in a new terminal
start_server() {
  local folder=$1
  local port=$2

  echo "Starting server for $folder on port $port..."

  # Open a new terminal for the server
  if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "cd $folder && npm run dev; exec bash"
  elif command -v x-terminal-emulator &> /dev/null; then
    x-terminal-emulator -e "bash -c 'cd $folder && npm run dev; exec bash'"
  elif command -v konsole &> /dev/null; then
    konsole -e "bash -c 'cd $folder && npm run dev; exec bash'"
  else
    echo "No supported terminal emulator found. Running in background..."
    (cd "$folder" && npm run dev) &
  fi
}

# Step 1: Install dependencies and build projects
for folder in "${!folders[@]}"; do
  (
    echo "Processing folder: $folder"
    cd "$folder" || exit 1

    # Install dependencies
    echo "Running 'npm i' in $folder..."
    npm i
  ) &
done

# Wait for all builds to complete
wait

echo "Starting dev servers..."

# Step 2: Check port usage and start servers
for folder in "${!folders[@]}"; do
  port=${folders[$folder]}

  if is_port_in_use $port; then
    echo "Port $port is already in use. Skipping start for $folder."
  else
    start_server "$folder" "$port"
  fi
done

echo "All processes started!"
