### STAGE 1: Build ###
FROM node:14.15.3-alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn utils:openapigen
COPY . .
RUN yarn build

### STAGE 2: Run ###
FROM nginx:1.17.6
COPY  ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html
CMD ["nginx",  "-g", "daemon off;"]



