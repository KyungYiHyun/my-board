# 빌드용 이미지
FROM node:18 as build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx
COPY ./frontend/default.conf /etc/nginx/conf.d/default.conf 
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]