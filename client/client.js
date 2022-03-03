const publicVapidKey = "BGNn4HU-PvugfnTdLSm0QHMsvpKlYpoReahPZtOAuuG0lt3azHJHV7HQL9Tdf8MxTfRmG0Ytk166tY-US-pPNHc";

//check for service worker
if ("serviceWorker" in navigator) {
  send().catch();
}

//register service worker, register for push notifications, and send push notification
async function send() {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("Service worker registered...");

  //register for push notifications
  console.log("Registering push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Push registered...");

  //send push notification
  console.log("Sending push notification...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push notification sent...");
}

function urlBase64ToUint8Array() {
  const padding = "=".repeat((4 - (publicVapidKey.length % 4)) % 4);
  const base64 = (publicVapidKey + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
