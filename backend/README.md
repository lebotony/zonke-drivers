# Backend

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Set up environment variables (see below)
  * Start Phoenix endpoint with `./run.sh` or `mix phx.server`

## Quick Setup

```bash
# 1. Install dependencies
mix setup

# 2. Set up environment variables (interactive)
./setup_env.sh

# 3. Start the server
./run.sh
```

## Manual Setup

If you prefer to set environment variables manually:

```bash
export GEOAPIFY_API_KEY="your_geoapify_api_key_here"
mix phx.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Environment Variables

- `GEOAPIFY_API_KEY`: Required for location search functionality (get from https://www.geoapify.com/)

## Troubleshooting

### Location search returns 400 error

If you see "Request failed with status code 400" when searching locations:

1. Check if `GEOAPIFY_API_KEY` is set:
   ```bash
   ./test_env.sh
   ```

2. Restart the server after setting environment variables:
   ```bash
   ./run.sh
   ```

3. Verify your API key is valid at https://myprojects.geoapify.com/

### Manual API key verification

```bash
# Check if token is in environment
echo $GEOAPIFY_API_KEY

# If empty, load it:
export GEOAPIFY_API_KEY="your_token_here"

# Or source from .env:
source .env && echo $GEOAPIFY_API_KEY
```

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
