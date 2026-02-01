# fallout76_tools

Tiny local dev server for the `web/` frontend used by these tools.

**Prerequisites**

- Docker and Docker Compose (or the Docker CLI v2 `docker compose`) installed
- (Optional) Python 3.11 and `livereload` if you prefer running the server locally

**Quick Start**

Start the development server (builds the image and mounts your `web/` folder):

```bash
make run_server
```

Stop the server:

```bash
make stop_server
```

Clean images and volumes created by compose:

```bash
make clean
```

You can also run the compose commands directly:

```bash
docker compose up --build
docker compose down
```

**What the Makefile does**

- `run_server`: runs `docker compose up --build` and prints helpful access URLs. The Makefile prints the host IP (via `hostname -I`) so you can open the site at `http://<host-ip>:8080` or `http://localhost:8080`.
- `stop_server`: runs `docker compose down`.
- `clean`: runs `docker compose down --rmi all --volumes` to remove images and volumes.

**Development server details**

- The container image is built from the `Dockerfile` and runs `scripts/server.py` (uses `livereload`).
- The host `./web` directory is mounted into the container at `/web`, so editing files in `web/` triggers live reload.
- The server serves the `web/` directory at port `8080` (container binds to `0.0.0.0:8080`).
