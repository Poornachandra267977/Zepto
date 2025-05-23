# Use official Node image
FROM node:18

RUN apt-get update && apt-get install -y 

# Set working directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./

RUN npm install

COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
