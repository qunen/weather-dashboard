FROM node:18-alpine
WORKDIR /usr/src/app

# Copy and install packages
COPY package*.json .
RUN npm ci

# Copy and run app
COPY . .
EXPOSE 4200
CMD ["npm", "run", "docker"]