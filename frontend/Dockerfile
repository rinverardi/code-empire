FROM httpd:2.4

COPY httpd.conf /usr/local/apache2/conf/httpd.conf
COPY src /usr/local/apache2/htdocs

WORKDIR /usr/local/apache2/htdocs
RUN chown -R www-data:www-data .
