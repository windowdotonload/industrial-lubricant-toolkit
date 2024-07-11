From nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY tool/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf 