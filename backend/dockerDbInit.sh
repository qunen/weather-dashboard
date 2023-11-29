#!/bin/bash
CONTAINER_STARTED="CONTAINER_STARTED"
if [ ! -e $CONTAINER_STARTED ]; then
    echo "Populating DB"
    npm run etl
    touch $CONTAINER_STARTED
fi
npm start