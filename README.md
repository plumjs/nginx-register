### Features
- generate nginx config

### Install
```bash
npm i @imyoon/nginx-helper -g
```

### Usage
- install nginx, set default directory '/usr/local/nginx'
- modify '/usr/local/nginx/conf/nginx.config', add including opr in http model
```bash
# eg
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    // --> here 
    include /etc/nginx/conf.d/*.conf;
}
```
- run command
```bash
Usage: register [options]

Options:
  -V, --version   output the version number
  -r, --register  register an config
  -h, --help      output usage information
```
- reload nginx
```bash
nginx -s reload
```
