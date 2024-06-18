# Step 1: Specify the base image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Step 5: Copy the rest of your application's source code
COPY . .

# Step 6: Expose the port your application listens on
EXPOSE 3001

# Step 7: Specify the command to run your application
CMD [ "npm", "start" ]

LABEL version="0.0.1"