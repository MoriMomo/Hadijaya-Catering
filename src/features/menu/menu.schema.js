import { z } from 'zod';

export const MenuItemSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  category: z.enum([
    'paket',
    'nasi',
    'daging',
    'ayam',
    'telur',
    'tahu-tempe',
    'sambel',
    'snack'
  ]),
  price: z.number().nonnegative(),
  desc: z.string(),
  featured: z.boolean().default(false),
  img: z.string().optional().nullable(),
  fallbackImg: z.string().optional().nullable()
});

export const MenuResponseSchema = z.array(MenuItemSchema);
