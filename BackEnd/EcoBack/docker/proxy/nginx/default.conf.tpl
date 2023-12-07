server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /vol/www/;

        proxy_buffer_size   256k;
        proxy_buffers       8 256k;
        proxy_busy_buffers_size 512k;
        proxy_redirect off;
        proxy_set_header X-Forwarded_Proto $scheme;  
    }

    location / {
        return 301 https://$host$request_uri;

        proxy_buffer_size   256k;
        proxy_buffers       8 256k;
        proxy_busy_buffers_size 512k;
        proxy_redirect off;
        proxy_set_header X-Forwarded_Proto $scheme;  
    }
}