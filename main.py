from fastapi import FastAPI, APIRouter

app = FastAPI()

api = APIRouter(prefix="/api")


@api.get("/hello")
def hello():
    return {"message": "Hello, world!"}


app.include_router(api)

app.frontend("/", directory="dist", fallback="index.html")
