import https from 'https';

const urls = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2620&auto=format&fit=crop",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Google_Meet_small_logo_%282020%29.svg/200px-Google_Meet_small_logo_%282020%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Zoom_logo_icon.svg/200px-Zoom_logo_icon.svg.png"
];

for (const url of urls) {
  https.get(url, (res) => {
    console.log(url, res.statusCode);
  }).on('error', (e) => {
    console.error(url, e.message);
  });
}
