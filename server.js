import app from "./src/app.js";

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await app.listen({ port: PORT, host: '0.0.0.0' });
    console.log("Server rodando em ${PORT}");	
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};


start();