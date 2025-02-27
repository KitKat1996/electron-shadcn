import json
import time
import sys
from random import randint

while True:
    try:
        # Send numbers
        numbers = {
            "n1": randint(0, 100),
            "n2": randint(0, 100),
            "n3": randint(0, 100)
        }
        print(json.dumps(numbers), flush=True)

        # Read input (non-blocking)
        if sys.stdin.readable():
            line = sys.stdin.readline()
            if line:
                try:
                    data = json.loads(line)
                    if "msg" in data:
                        print(f"Received message: {data['msg']}", file=sys.stderr, flush=True)
                except json.JSONDecodeError:
                    pass

        time.sleep(14)
    except KeyboardInterrupt:
        break