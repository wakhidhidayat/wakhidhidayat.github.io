const webPush = require('web-push');
     
const vapidKeys = {
   "publicKey": "BAF6pNWCHyLPiM0ChaMQN6M7f10mRmxnZkTXuyZMpxIp0B80_evbWPMFfQ9fnpIwgfwHNqgPPyIwMRAFzBX-u2U",
   "privateKey": "tSbQ0-FmVMFYTV344dlQg2F9aUswTJcjOxemPfjWHsI"
};
 
 
webPush.setVapidDetails(
   'mailto:wshidayat38@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
);

let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ecR39VvtwyI:APA91bGddTFF1r7Y1_0eBIwEGoGyOLmevZpfMM9Vae5DMgTubaZ4yruFckjI4vHDEIsSkfBdSfPltFgFthyiEHkMGDu6DiDc8GI7AVa9yDFKLnAkbN0uOytbEiqDfNQ9nJ8VoeYDi71U",
   "keys": {
       "p256dh": "BN7X1/4EyyclhI38GmOZImo9YrwO/Ux2ENtBZ+2rxieDua9De+5ycF8T9X1ntZWGRQlJkjZDDMfKO/kMw7yZ/Rk=",
       "auth": "1cS5YL8Pshb5sQX/cYYrGw=="
   }
};

const payload = 'Notification from playload!';
 
const options = {
   gcmAPIKey: '53154530748',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);