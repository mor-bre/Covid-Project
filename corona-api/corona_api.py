from email import header
from fastapi import FastAPI
import uvicorn
import requests
import json
from fastapi.middleware.cors import CORSMiddleware

from code_to_state import CODE_TO_STATE

app = FastAPI()

origins = [
    "https://localhost",
    "http://localhost",
    "https://localhost:3000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/current-usa")
async def current_usa():
    response: requests.models.Response = requests.get(
        "https://api.covidtracking.com/v1/us/current.json")
    response_data: dict = json.loads(response.text)[0]
    filtered_response_data: dict = {
        "positive": response_data["positive"],
        "negative": response_data["negative"],
        "hospitalizedCurrently": response_data["hospitalizedCurrently"],
        "death": response_data["death"],
        "hospitalized": response_data["hospitalized"],
        "totalTestResults": response_data["totalTestResults"],
        "deathIncrease": response_data["deathIncrease"],
        "positiveIncrease": response_data["positiveIncrease"],
        "negativeIncrease": response_data["negativeIncrease"]
    }
    return json.dumps(filtered_response_data)


@app.get("/last-week-usa")
async def last_week_usa():
    return_list: list = []
    for date in range(20210301, 20210308):
        response: requests.models.Response = requests.get(
            f"https://api.covidtracking.com/v1/us/{date}.json")
        response_data: dict = json.loads(response.text)
        filtered_response_data: dict = {
            "date": response_data["date"],
            "positive": response_data["positive"],
        }
        return_list.append(filtered_response_data)
    return json.dumps(return_list)


@app.get("/states")
async def states():
    return_list: list = []
    response: requests.models.Response = requests.get(
        "https://api.covidtracking.com/v1/states/current.json")
    response_data: dict = json.loads(response.text)
    for state in response_data:
        filtered_state: dict = {
            "state": CODE_TO_STATE[state["state"]],
            "positive": state["positive"],
            "negative": state["negative"],
            "hospitalizedCurrently": state["hospitalizedCurrently"],
            "death": state["death"],
            "hospitalized": state["hospitalized"],
            "totalTestResults": state["totalTestResults"],
            "deathIncrease": state["deathIncrease"],
            "positiveIncrease": state["positiveIncrease"],
            "negativeIncrease": state["negativeIncrease"],
            "inIcuCurrently": state["inIcuCurrently"],
            "onVentilatorCurrently": state["onVentilatorCurrently"]
        }
        return_list.append(filtered_state)
    return json.dumps(return_list)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
