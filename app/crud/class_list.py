import os, json
from app.schema.class_list import Class_List

def get_classes():
    path = "app/config/classes"
    response = []
    for file in os.listdir(path):
        if file.endswith(".json"):

            with open(os.path.join(path, file)) as f:
                data = json.load(f)
                response.append(Class_List(**data))

    return response