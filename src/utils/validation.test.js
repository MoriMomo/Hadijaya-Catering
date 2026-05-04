import { describe, it, expect } from 'vitest';
import { validateName } from './validation';

describe('validateName', () => {
    it('returns empty string for valid name', () => {
        expect(validateName('John Doe')).toBe('');
        expect(validateName('Alice')).toBe('');
    });

    it('returns error when name is empty', () => {
        expect(validateName('')).toBe('Nama wajib diisi');
    });

    it('returns error when name contains only whitespace', () => {
        expect(validateName('   ')).toBe('Nama wajib diisi');
        expect(validateName('\t')).toBe('Nama wajib diisi');
        expect(validateName('\n')).toBe('Nama wajib diisi');
    });

    it('returns error when name has fewer than 3 characters after trimming', () => {
        expect(validateName('ab')).toBe('Nama minimal 3 karakter');
        expect(validateName(' a ')).toBe('Nama minimal 3 karakter');
        expect(validateName('12')).toBe('Nama minimal 3 karakter');
    });

    it('returns empty string for a valid name with leading/trailing whitespace', () => {
        expect(validateName('  John  ')).toBe('');
    });
});
