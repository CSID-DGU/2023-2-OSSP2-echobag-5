server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /vol/www/;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen      443 ssl;
    server_name ${DOMAIN} www.${DOMAIN};

    # SSL Configuration
    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include     /etc/nginx/options-ssl-nginx.conf;
    ssl_dhparam /vol/proxy/ssl-dhparams.pem;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Static Asset Handling
    location /static {
        alias /vol/static;

        # Proxy Buffer Settings
        proxy_pass "https://15.164.229.6:443";

        proxy_buffer_size   256k;
        proxy_buffers       8 256k;
        proxy_busy_buffers_size 512k;
        proxy_redirect off;
        proxy_set_header X-Forwarded_Proto $scheme;  
    }

    # uWSGI Handling
    location / {
        uwsgi_pass           ${APP_HOST}:${APP_PORT};
        include              /etc/nginx/uwsgi_params;
        client_max_body_size 10M;

        proxy_buffer_size   256k;
        proxy_buffers       8 256k;
        proxy_busy_buffers_size 512k;
        proxy_redirect off;
        proxy_set_header X-Forwarded_Proto $scheme;  
    }
}
