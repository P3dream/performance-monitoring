# Performance Monitoring

## Running without Docker

To run the application **locally without Docker** (development mode with hot reload):

```bash
npm install
npm run start:dev
```

> This will run the application directly on your machine and reflect code changes immediately.

---

## Running in Development with Docker

To run the application in **development mode** with hot reload inside Docker:

```bash
docker build -t perf-monitoring-dev --target dev .
docker run -p 4432:4432 --name perf-dev -v $(pwd):/app -d perf-monitoring-dev
```

> The volume `-v $(pwd):/app` ensures that changes in your local code are immediately reflected inside the container.

---

## Running in Production

To run the application in **production mode**:

```bash
docker build -t perf-monitoring-prod --target runtime .
docker run -p 4432:4432 --name perf-prod -d perf-monitoring-prod
```

> The production version only uses the compiled files in `dist/` and installs production dependencies, resulting in a smaller and faster image.

---

## Accessing the Application

After running the container or starting locally, open in your browser or Postman:

```
http://localhost:4432
```

---

## Recommended Repository Structure

- `Dockerfile` (or `Dockerfile.dev` / `Dockerfile.prod`)
- `.dockerignore` (to ignore `node_modules`, `dist`, and sensitive files)
- `package.json` / `package-lock.json`
- NestJS source code (`src/`)

---

## Notes

- For faster future builds, Docker uses layer caching (`npm install` and build).
- Do not upload `node_modules` or `dist/` to GitHub; use `.dockerignore`.
- Next steps would be to add Prometheus to Docker, but that can be done later.

