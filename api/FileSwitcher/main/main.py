from fastapi import FastAPI, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import preset_manager
import folder_navigation

app = FastAPI()

####### get around CORS ####
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
############################


def check_for_presets(directory):
    print(directory)


# load main
# main gets access to routes

@app.post("/get_directory")
def get_directory(payload: dict = Body(...)):
    return folder_navigation.get_directory(payload)

@app.post("/step_out")
def step_out(payload: dict = Body(...)):
    return folder_navigation.step_out(payload)

@app.post("/preset_manager_test")
def preset_manager_test(payload: dict = Body(...)):
    preset_manager.preset_manager_test(payload)
