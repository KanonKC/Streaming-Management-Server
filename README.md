## Install

```
# Build the image
docker build -t stream-management-server:latest .

# Run the container with auto-restart
docker run -d --restart=always --name stream-management-server-container stream-management-server:latest
```