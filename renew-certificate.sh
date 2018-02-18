echo "1. RENEWING CERTIFICATE" 
sudo certbot renew --force-renewal --standalone

echo "2. UPDATING CERTIFICATE" 
heroku certs:update /etc/letsencrypt/live/patrikmarin.fi/fullchain.pem /etc/letsencrypt/live/patrikmarin.fi/privkey.pem -a patrikmarin --confirm patrikmarin