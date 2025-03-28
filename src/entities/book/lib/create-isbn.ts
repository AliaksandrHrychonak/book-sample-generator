export const createISBN = (locale: string): string => {
    const prefix = Math.random() < 0.5 ? '978' : '979';
    // TODO Fix cast
    const groupMap: { [key: string]: string[] } = {
        en: ['0', '1'],
        de: ['3'],
        fr: ['2'],
    };

    const group = (groupMap[locale] ?? ['0'])[0];
    const publisher = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    const title = String(Math.floor(Math.random() * 100000)).padStart(5, '0');

    const withoutChecksum = `${prefix}-${group}-${publisher}-${title}`;

    const plainIsbn = withoutChecksum.replace(/-/g, '');

    let sum = 0;
    for (let i = 0; i < 12; i++) {
        const digit = plainIsbn.charAt(i);
        sum += parseInt(digit) * (i % 2 === 0 ? 1 : 3);
    }
    const checksum = ((10 - (sum % 10)) % 10).toString();

    return `${withoutChecksum}-${checksum}`;
};
