FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf  # 🔥 Thêm dòng này

EXPOSE 80  # ✅ NGINX chạy cổng 80, không phải 3000
CMD ["nginx", "-g", "daemon off;"]
