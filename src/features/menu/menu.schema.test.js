import { describe, it, expect } from 'vitest';
import { MenuItemSchema, MenuResponseSchema } from './menu.schema';

describe('MenuItemSchema', () => {
  const validItem = {
    id: 1,
    name: 'Paket A - Nasi Uduk Ijo + Daging Semur',
    category: 'paket',
    price: 35000,
    desc: 'Deskripsi paket A',
    featured: true,
    img: '/images/hadijaya/makanan/paket/paket-a.webp',
    fallbackImg: '/images/placeholder.svg',
  };

  it('validates a correct menu item', () => {
    const result = MenuItemSchema.safeParse(validItem);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe(validItem.name);
      expect(result.data.price).toBe(35000);
    }
  });

  it('fails when id is negative or non-integer', () => {
    expect(MenuItemSchema.safeParse({ ...validItem, id: -1 }).success).toBe(false);
    expect(MenuItemSchema.safeParse({ ...validItem, id: 1.5 }).success).toBe(false);
  });

  it('fails when name is empty', () => {
    const result = MenuItemSchema.safeParse({ ...validItem, name: '' });
    expect(result.success).toBe(false);
  });

  it('fails when category is not in the allowed enum', () => {
    const result = MenuItemSchema.safeParse({ ...validItem, category: 'minuman-boba' });
    expect(result.success).toBe(false);
  });

  it('fails when price is negative or string', () => {
    expect(MenuItemSchema.safeParse({ ...validItem, price: -5000 }).success).toBe(false);
    expect(MenuItemSchema.safeParse({ ...validItem, price: '35000' }).success).toBe(false);
  });

  it('defaults featured to false when omitted', () => {
    const { featured: _, ...withoutFeatured } = validItem;
    const result = MenuItemSchema.safeParse(withoutFeatured);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.featured).toBe(false);
    }
  });
});

describe('MenuResponseSchema', () => {
  it('validates a list of valid menu items', () => {
    const list = [
      {
        id: 1,
        name: 'Ayam Goreng',
        category: 'ayam',
        price: 15000,
        desc: 'Ayam goreng gurih',
      },
      {
        id: 2,
        name: 'Nasi Uduk Ijo',
        category: 'nasi',
        price: 12000,
        desc: 'Nasi uduk harum',
      },
    ];

    const result = MenuResponseSchema.safeParse(list);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(2);
    }
  });

  it('fails when payload is not an array', () => {
    expect(MenuResponseSchema.safeParse({ items: [] }).success).toBe(false);
    expect(MenuResponseSchema.safeParse(null).success).toBe(false);
  });

  it('validates the actual public/data/menu.json file', async () => {
    const fs = await import('node:fs');
    const filePath = new URL('../../../public/data/menu.json', import.meta.url);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const result = MenuResponseSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.length).toBeGreaterThan(0);
    }
  });
});


