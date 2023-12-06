from fastapi import FastAPI, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

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

# @app.get("/")
# def read_root():
#     print("doing a hello world")
#     return "Hello Worlds"

# @app.post("/get_all_games")
# def get_all_games():
#     print("received post...")
#     print("getting games folders...")
#     games = os.listdir("./Games")
#     print("folder names acquired:")
#     print(games)
#     return games

# @app.post("/get_dir")
# def get_dir(payload: dict = Body(...)):
#     dir_name = payload["directory"]
#     directory = dir_name
#     print(directory)
#     dir_arr = os.listdir(directory)
#     dir_address = directory
#     result = {
#         "folders" : dir_arr,
#         "directory": dir_address
#     }
#     return result

#     # print(os.listdir("./Games/"+selected_game))

# @app.post("/get_home_dir")
# def get_dir():
#     print("getting home dir")
#     print("directory= ./Games/")
#     directory = "./Games/"

#     dir_arr = os.listdir(directory)
#     dir_address = directory

#     result = {
#         "folders" : dir_arr,
#         "directory": dir_address
#     }
#     return result

def check_for_presets(directory):
    print(directory)
    

@app.post("/get_directory")
def get_directory(payload: dict = Body(...)):
    print("getting a directory")
    directory = os.scandir(payload["directory"])
    check_for_presets(payload["directory"])

    dir_folders = []
    dir_files = []

    for item in directory:
        if item.is_file():
            # print(item)
            # NOTE: probably no need for path
            dir_files.append({"name": item.name, "path": item.path})
        else:
            # print(item)
            dir_folders.append({"name": item.name, "path": item.path})
    # print(dir_folders)
    # print(dir_files)

    res = {"dir_folders": dir_folders, "dir_files": dir_files}

    return res


@app.post("/step_out")
def step_out(payload: dict = Body(...)):
    print("stepping out of a directory")
    directory = payload["directory_to_step"]
    new_directory_end_char_idx = 0
    for i in range(len(directory) - 1, 0, -1):
        # print(directory[i])
        # print(i)
        if directory[i] == "\\":
            new_directory_end_char_idx = i
            break
    stepped_directory = directory[0:new_directory_end_char_idx]
    print(stepped_directory)
    return stepped_directory
