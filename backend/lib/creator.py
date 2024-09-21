import random

LEN = 10
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
low_letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
upper_letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
# special = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '|', ';', ':', "'", '"', ',', '<', '.', '>', '?', '`', '~']
joined = numbers + low_letter + upper_letter


def create_session_token() -> str:
    token_numbers = []
    for i in range(LEN):
        rand = random.randint(0, len(joined) - 1)
        token_numbers.append(str(joined[rand]))
    return ''.join(token_numbers)
