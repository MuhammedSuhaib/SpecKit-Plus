FROM python:3.11-slim

WORKDIR /app

# Install uv for fast dependency management
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-dev

# COPY EVERYTHING (Required because main.py imports from services, models, etc.)
COPY . .

# Hugging Face Spaces MUST use port 7860
EXPOSE 7860

# Run the application on port 7860
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]