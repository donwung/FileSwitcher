from fastapi import FastAPI, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os


def get_directory(payload: dict = Body(...)):
    print("getting a directory")
    directory = os.scandir(payload["directory"])
    # check_for_presets(payload["directory"])

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

def step_out(payload):
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
