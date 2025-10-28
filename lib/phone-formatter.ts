/**
 * Phone number formatter and validator for American phone numbers
 * Handles various input formats and includes bot prevention
 */

// Common bot phone numbers to block
const BOT_PHONE_NUMBERS = [
    '1234567890',
    '1111111111',
    '0000000000',
    '1231231234',
    '5555555555',
    '9999999999',
    '1111111111',
    '2222222222',
    '3333333333',
    '4444444444',
    '5555555555',
    '6666666666',
    '7777777777',
    '8888888888',
    '9999999999',
    '0000000000',
    '1234567890',
    '9876543210',
    '0123456789',
    '0987654321',
    '1111111111',
    '2222222222',
    '3333333333',
    '4444444444',
    '5555555555',
    '6666666666',
    '7777777777',
    '8888888888',
    '9999999999',
    '0000000000'
];

// Common sequential patterns that are likely bots
const SEQUENTIAL_PATTERNS = [
    /^1234567890$/,
    /^0987654321$/,
    /^0123456789$/,
    /^9876543210$/,
    /^1111111111$/,
    /^2222222222$/,
    /^3333333333$/,
    /^4444444444$/,
    /^5555555555$/,
    /^6666666666$/,
    /^7777777777$/,
    /^8888888888$/,
    /^9999999999$/,
    /^0000000000$/
];

export interface PhoneFormatterResult {
    formatted: string;
    isValid: boolean;
    isBot: boolean;
    error?: string;
}

/**
 * Extracts digits from phone number string
 */
function extractDigits(phone: string): string {
    return phone.replace(/\D/g, '');
}

/**
 * Checks if phone number is likely from a bot
 */
function isBotPhone(phone: string): boolean {
    const digits = extractDigits(phone);

    // Check against known bot numbers
    if (BOT_PHONE_NUMBERS.includes(digits)) {
        return true;
    }

    // Check against sequential patterns
    if (SEQUENTIAL_PATTERNS.some(pattern => pattern.test(digits))) {
        return true;
    }

    // Check for repeated digits (more than 6 consecutive)
    if (/(\d)\1{5,}/.test(digits)) {
        return true;
    }

    // Check for ascending/descending sequences
    const ascending = '0123456789';
    const descending = '9876543210';
    if (digits === ascending || digits === descending) {
        return true;
    }

    return false;
}

/**
 * Validates American phone number format
 */
function isValidAmericanPhone(phone: string): boolean {
    const digits = extractDigits(phone);

    // Must be exactly 10 digits for US numbers
    if (digits.length !== 10) {
        return false;
    }

    // First digit cannot be 0 or 1
    if (digits[0] === '0' || digits[0] === '1') {
        return false;
    }

    // Second digit cannot be 0 or 1
    if (digits[1] === '0' || digits[1] === '1') {
        return false;
    }

    return true;
}

/**
 * Formats phone number to standard American format: (123) 456-7890
 */
function formatPhoneNumber(phone: string): string {
    const digits = extractDigits(phone);

    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Main phone formatter function
 */
export function formatPhone(phone: string): PhoneFormatterResult {
    if (!phone || phone.trim() === '') {
        return {
            formatted: '',
            isValid: false,
            isBot: false,
            error: 'Phone number is required'
        };
    }

    const digits = extractDigits(phone);

    // Check for bot patterns
    if (isBotPhone(phone)) {
        return {
            formatted: formatPhoneNumber(phone),
            isValid: false,
            isBot: true,
            error: 'Invalid phone number format'
        };
    }

    // Validate American phone format
    if (!isValidAmericanPhone(phone)) {
        return {
            formatted: formatPhoneNumber(phone),
            isValid: false,
            isBot: false,
            error: 'Please enter a valid 10-digit American phone number'
        };
    }

    return {
        formatted: formatPhoneNumber(phone),
        isValid: true,
        isBot: false
    };
}

/**
 * Real-time phone input formatter for input fields
 */
export function formatPhoneInput(value: string): string {
    const digits = extractDigits(value);

    // Limit to 10 digits
    const limitedDigits = digits.slice(0, 10);

    return formatPhoneNumber(limitedDigits);
}

/**
 * Phone validation for form schemas
 */
export function validatePhoneNumber(phone: string): boolean {
    const result = formatPhone(phone);
    return result.isValid && !result.isBot;
}