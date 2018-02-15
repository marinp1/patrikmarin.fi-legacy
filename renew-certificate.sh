echo "1. RENEWING CERTIFICATE" 
sudo certbot renew --force-renewal --standalone

echo "2. UPDATING CERTIFICATE" 
heroku certs:update /etc/letsencrypt/live/www.patrikmarin.fi/fullchain.pem /etc/letsencrypt/live/www.patrikmarin.fi/privkey.pem -a patrikmarin --confirm patrikmarin