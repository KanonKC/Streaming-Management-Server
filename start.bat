(ssh -p 443 -R0:localhost:8082 -L4300:localhost:4300 -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -t eJuMzHGFi1r@ap.a.pinggy.io x:https
timeout /t 10)