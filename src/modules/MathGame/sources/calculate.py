import sys

STACK = []
pointer = -1
size = 0

def push(value):
    global pointer,size
    if pointer + 1 == size:
        size += 1
        STACK.append(value)
    else:
        STACK[pointer + 1] = value
    pointer += 1

def empty():
    global pointer
    return pointer == -1

def pop(remove=True):
    global pointer
    if pointer == -1:
        return None

    rtn = STACK[pointer]
    if remove:
        pointer -= 1
    return rtn

def show():
    global pointer

def toPostfix(expression):
    operators = ["-","+","/","*"]
    result = []

    for char in expression:
        if char not in operators:
            result.append(char)
        else:
            while not empty():
                if operators.index(pop(False)) >= operators.index(char):
                    result.append(pop())
                else:
                    break
            push(char)

    while not empty():
        result.append(pop())

    return " ".join(result)

def postfixCalculate(expression):
    operators = ["-","+","/","*"]
    result = 0
    for char in expression:
        if char not in operators:
            push(int(char))
        else:
            op1 = pop()
            op2 = pop()
            result = 0

            if char == "-":
                result = op2 - op1
            elif char == "+":
                result = op2 + op1
            elif char == "/":
                result = op2 / op1
            elif char == "*":
                result = op2 * op1
            push(result)

    return result

def createNonNegativeExpressionList(expression):
    expressionList  = expression
    for i in range(len(expressionList) - 1):
        if expressionList[i] == "-":
            expressionList[i] = "+"
            expressionList[i+1] = f"-{expressionList[i+1]}"
    return expressionList

if __name__ == "__main__":
    expression = sys.argv[1].split()
    nonNegativeList = createNonNegativeExpressionList(expression)
    postfix = toPostfix(nonNegativeList)
    print(postfixCalculate(postfix.split()))