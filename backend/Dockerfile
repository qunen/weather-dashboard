FROM node:18
WORKDIR /usr/src/api

# Copy and install packages
COPY package*.json .
RUN npm ci

# Copy and run server
COPY . .
# RUN bash dockerDbInit.sh
CMD ["bash", "dockerDbInit.sh"]