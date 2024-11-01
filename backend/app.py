import uvicorn
from fastapi import FastAPI
from api.routes import router

app = FastAPI()

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("app:app", ssl_keyfile="../key.pem", ssl_certfile="../cert.pem")