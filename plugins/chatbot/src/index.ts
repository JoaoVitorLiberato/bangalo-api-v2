import App from "./Presentation/Http/ApplicationHttp.presentation.http";

App.get("/", () => {
  return {
    chatbot: {
      running: true,
      mensage: `Chatbot is running at port ${App.server?.port}.`
    }
  }
});
