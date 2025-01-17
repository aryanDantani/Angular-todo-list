import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(phone: string, countryCode: string): string {
    if (!phone || !countryCode) return '';

    // Trim phone input and normalize countryCode to lower case
    phone = phone.trim();
    countryCode = countryCode.trim();

    switch (countryCode) {
      case '+91': // India
        return this.formatIndia(phone);
      case '+1': // USA
        return this.formatUSA(phone);
      case '+44': // UK
        return this.formatUK(phone);
      default:
        return phone; // Fallback to unformatted phone
    }
  }

  private formatIndia(phone: string): string {
    // India: Expecting exactly 10 digits
    const validPhone = phone.slice(0, 10);
    return validPhone.length === 10
      ? `${validPhone.slice(0, 5)}-${validPhone.slice(5)}`
      : phone;
  }

  private formatUSA(phone: string): string {
    // USA: Expecting exactly 10 digits
    const validPhone = phone.slice(0, 10);
    return validPhone.length === 10
      ? `(${validPhone.slice(0, 3)}) ${validPhone.slice(
          3,
          6
        )}-${validPhone.slice(6)}`
      : phone;
  }

  private formatUK(phone: string): string {
    // UK: Expecting exactly 10 digits
    const validPhone = phone.slice(0, 10);
    return validPhone.length === 10
      ? `${validPhone.slice(0, 4)} ${validPhone.slice(4, 7)} ${validPhone.slice(
          7
        )}`
      : phone;
  }
}
