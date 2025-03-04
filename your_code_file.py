import os
import litellm

# Get the API key from the environment variable
google_vertex_ai_api_key = os.environ.get("AIzaSyCTh9uIx_0m4Y_rGsidl9CdDCTmdIRFnKk")

if google_vertex_ai_api_key is None:
    raise ValueError("AIzaSyCTh9uIx_0m4Y_rGsidl9CdDCTmdIRFnKk environment variable not set.")

# Set the API key in litellm
litellm.set_api_key(google_vertex_ai_api_key, "vertex_ai")

# ... rest of your code using litellm ...
