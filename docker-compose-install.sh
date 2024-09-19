#!/bin/bash

# Fetch the latest stable version of Docker Compose
COMPOSE_VERSION="1.29.2"  # You can update this version as needed

# Download Docker Compose binary to /usr/local/bin
sudo curl -L "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make the binary executable
sudo chmod +x /usr/local/bin/docker-compose

# Optionally, create a symlink to /usr/bin for easier global access
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify the installation by checking the version
docker-compose --version

echo "Docker Compose version ${COMPOSE_VERSION} installed successfully!"
