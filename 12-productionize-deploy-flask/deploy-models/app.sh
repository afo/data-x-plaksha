#!/bin/bash

exec gunicorn --bind 0.0.0.0:40001 --timeout 600 --keep-alive  300 -w 4 --preload app:app
