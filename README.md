# ROUTES: [method - access - route (expalin) - body]

# AUTH: 
## POST  public /api/auth/login (Login with local account ) body {username, password}
## POST  public /api/auth/register (Register with local account) body {username, email, password, name, gender}
## POST  public /api/auth/google (Login with google account) body {tokenId}
## POST  public /api/auth/sendmail (Send a email) body {to, subject}
## POST  public /api/auth/forgot-password (Send for user a email with link to reset their password) body{email}
## PATCH  public /api/auth/reset-password (Reset password) body{token, password}

# RENTER:
## POST  public /api/renter/create-sample (Create 1000 samples)
## GET private /api/renter (Get information of a renter) 
## DELETE public /api/renter/destroy (Destroy tables renter)
## POST private /api/renter/upload-avatar (Upload avatar for renter) 

## PLAYER:
## POST  public /api/player/create-sample (Create 1000 samples)
## GET public /api/player (Get player pages) body {page}
## DELETE public /api/renter/destroy (Destroy players renter)
