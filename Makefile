COMPOSE_CMD := docker compose
IP_ADDR := $(shell hostname -I | awk '{print $$1}')

.PHONY: help run run_server stop stop_server restart status clean logs

all: help

help:
	@echo "🛠️  Available commands:"
	@echo ""
	@echo "  make run_server   - Start the server in the background (detached)"
	@echo "  make stop_server  - Stop the running server"
	@echo "  make restart      - Stop and restart the server"
	@echo "  make status       - Check if the container is running"
	@echo "  make logs         - View live server output/livereload logs"
	@echo "  make clean        - Remove containers, images, and volumes"
	@echo ""
	@echo "🔗 Aliases:"
	@echo "  make run          - Shortcut for run_server"
	@echo "  make stop         - Shortcut for stop_server"
	@echo ""

run: run_server

run_server:
	@echo "🚀 Starting development server..."
	@ $(COMPOSE_CMD) up --build -d
	@echo "🌍 Access your page at: http://$(IP_ADDR):8080"
	@echo "🏠 Or locally at: http://localhost:8080"

stop: stop_server

down: stop_server

stop_server:
	@echo "🛑 Stopping server..."
	@ $(COMPOSE_CMD) down

restart: stop_server run_server

status:
	@echo "📊 Container Status:"
	@ $(COMPOSE_CMD) ps

logs:
	@echo "📜 Streaming logs..."
	@ $(COMPOSE_CMD) logs -f

clean:
	@echo "🧹 Deep cleaning Docker environment..."
	@ $(COMPOSE_CMD) down --rmi all --volumes