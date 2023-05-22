const errors: ErrorsType = {
    cardNumberError: '',
    dateError: '',
    cvvError: ''
}

const hasNonDigitSymbols = (str: string) => {
    const pattern = /\D/;
    return pattern.test(str);
}

const checkLastDigit = (cardNumber: string) => {
    const digits = cardNumber.split('').map(Number);
    if (cardNumber.length % 2 === 0) {
        for (let i = digits.length - 2; i >= 0; i -= 2) {
            digits[i] *= 2;
            if (digits[i] > 9) {
                digits[i] -= 9;
            }
        }
    } else {
        for (let i = digits.length - 1; i >= 0; i -= 2) {
            digits[i] *= 2;
            if (digits[i] > 9) {
                digits[i] -= 9;
            }
        }
    }
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    const sumWithoutLastDigit = sum - digits[digits.length - 1]
    return (sumWithoutLastDigit + digits[digits.length - 1]) % 10 === 0;
}


const isCardNumberValid = (cardNumber: string) => {
    if (cardNumber.length < 16 || cardNumber.length > 19 || hasNonDigitSymbols(cardNumber)) {
        errors.cardNumberError = 'Card number should be between 16 and 19 digits long'
    } else if (!checkLastDigit(cardNumber)) {
        errors.cardNumberError = 'Invalid card number'
    } else {
        errors.cardNumberError = ''
    }
}

const isDateValid = (month: string, year: string) => {
    const date = new Date();
    const monthNow = date.getMonth() + 2;
    const yearNow = date.getFullYear();

    if (hasNonDigitSymbols(month) || hasNonDigitSymbols(year)) {
        errors.dateError = 'Wrong date, digits only'
    } else if (month.length !== 2 || year.length !== 4) {
        errors.dateError = 'Wrong format'
    } else if (+month > 12 || +month === 0) {
        errors.dateError = 'Wrong date'
    } else if (+year < yearNow) {
        errors.dateError = 'The card is expired'
    } else if (+year === yearNow) {
        if (+month < monthNow) {
            errors.dateError = 'The card is expired'
        } else {
            errors.dateError = ''
        }
    } else {
        errors.dateError = ''
    }
}
const isCvvValid = (cardNumber: string, cvv: string) => {
    if (hasNonDigitSymbols(cvv)) {
        errors.cvvError = 'Wrong CVV'
    } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
        errors.cvvError = cvv.length === 4
            ? ''
            : 'Wrong CVV'
    } else {
        errors.cvvError = cvv.length === 3
            ? ''
            : 'Wrong CVV'
    }
}
export const validationRepository = {
    async validateData(cardNumber: string, month: string, year: string, cvv: string): Promise<ErrorsType> {
        isCardNumberValid(cardNumber)
        isDateValid(month, year)
        isCvvValid(cardNumber, cvv)
        return errors
    }
}

export type ErrorsType = {
    cardNumberError: string,
    dateError: string,
    cvvError: string
}
