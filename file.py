import os
import litellm

api_key = os.environ.get("AIzaSyCTh9uIx_0m4Y_rGsidl9CdDCTmdIRFnKk")
litellm.set_api_key(api_key, "vertex_ai")

# ... rest of your code using litellm ...
