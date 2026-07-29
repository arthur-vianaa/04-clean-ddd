import { Either, left, right } from "./either"

function DoSomething(x: boolean): Either<string, number> {
    if (x)
        return right(10)
    else
        return left('error')
}

test('success result', () => {
    const successResult = DoSomething(true)

    if (successResult.isRight()) {
        console.log(successResult.value)
    }

    expect(successResult.isRight()).toBe(true)
    expect(successResult.isLeft()).toBe(false)
})

test('error result', () => {
    const error = left('error')

    expect(error.isRight()).toBe(false)
    expect(error.isLeft()).toBe(true)
})