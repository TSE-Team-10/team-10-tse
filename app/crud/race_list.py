import os, json
from app.schema.race_list import Race_List

def get_races():
    path = "app/config/races"
    response = []
    for file in os.listdir(path):
        if file.endswith(".json"):

            with open(os.path.join(path, file)) as f:
                data = json.load(f)
                response.append(Race_List(**data))

    return response