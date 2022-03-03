console.log("Service worker loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push received...");
  self.registration.showNotification(data.title, {
    body: "Notification from the server",
    icon: "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456324.png",
  });
});
