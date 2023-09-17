import json
import random

def generate_question(difficulty):
    while True:
        if difficulty == 1:
            num1 = random.randint(100, 999)
            num2 = random.randint(1, 999)
            operator = random.choice(['+', '-', '*', '/'])
            question = f"{num1} {operator} {num2}"
            result = eval(question)
            if abs(result) < 10000:  # Check if the whole number part is less than 10000
                break
        else:
            prev_question, prev_correct_option, prev_options = generate_question(difficulty - 1)
            num = random.randint(10, 99)
            operator = random.choice(['+', '-', '*', '/'])
            question = f"({prev_question}) {operator} {num}"
            result = eval(question)
            if abs(result) < 10000:  # Check if the whole number part is less than 10000
                break

    correct_option = random.choice(['A', 'B', 'C', 'D'])

    if isinstance(result, int):
        min_val = max(result - 50, 0)
        max_val = result + 50
        min_val = min(min_val, max_val)  # Ensure min_val is not greater than max_val
        options = {
            'A': random.randint(min_val, max_val),
            'B': random.randint(min_val, max_val),
            'C': random.randint(min_val, max_val),
            'D': random.randint(min_val, max_val)
        }
        options[correct_option] = result
    else:
        options = {
            'A': round(result + random.uniform(-50, 50), 2),
            'B': round(result + random.uniform(-50, 50), 2),
            'C': round(result + random.uniform(-50, 50), 2),
            'D': round(result + random.uniform(-50, 50), 2)
        }
        options[correct_option] = round(result, 2)

    return question, correct_option, options

data = []

for q_no in range(1, 1001):
    difficulty = random.randint(1, 3)
    question, correct_option, options = generate_question(difficulty)
    frequency = random.randint(1, 100)
    accuracy = 0

    data.append({
        'Q_no': q_no,
        'Question': question,
        'Opt_A': options['A'],
        'Opt_B': options['B'],
        'Opt_C': options['C'],
        'Opt_D': options['D'],
        'Correct': correct_option,
        'Difficulty': difficulty,
        'Frequency': frequency,
        'Accuracy': accuracy
    })

with open('data.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Data generated and saved to 'data.json'")
