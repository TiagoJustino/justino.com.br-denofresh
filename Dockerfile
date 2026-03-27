FROM denoland/deno:2.1.4

WORKDIR /app

# Cache dependencies
COPY deno.json .
RUN deno install

# Copy source
COPY . .

# Build Fresh assets
RUN deno task build

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
