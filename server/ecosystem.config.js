module.exports = {
  apps : [{
    name   : "app1",
    script : "./app.js",
    watch: true,
    env: {
      "PORT": 80,
      "NODE_ENV": "production",
      "DATABASE_URL": "postgresql://postgres:kNVTnGRfeJ8p2JzN@db.cuhgjwbvuvkeadcwswye.supabase.co:5432/postgres",
      "ACCESS_SECRET_TOKEN":"aiyaiya",
      "RAWG_TOKEN":"54071a691b7949ac8041f21d827fce48",
      "MIDTRANS_TOKEN":"SB-Mid-server-5qhA3BlZ8YhAbszIWFTsqkdR",
      "GOOGLE_CLIENT_ID":"564100104538-rel0qra65qeom6o0k7uqlkgv7scg3q66.apps.googleusercontent.com",
      "GOOGLE_CLIENT_SECRET":"564100104538-rel0qra65qeom6o0k7uqlkgv7scg3q66.apps.googleusercontent.com"
    }
  }]
}
