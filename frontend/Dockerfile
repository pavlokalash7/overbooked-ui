FROM node:22.11.0-alpine
WORKDIR /usr/src/app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
COPY package*.json ./
RUN yarn && yarn add next
COPY . .
RUN npm run build 