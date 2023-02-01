export default function APIserverURl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000/v1/";
  }
  return "https://kanban-friends-server.onrender.com/v1/";
}
