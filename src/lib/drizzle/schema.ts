import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import {
  timestamp,
  pgTable,
  text,
  serial,
  integer,
  json,
  uniqueIndex,
  boolean,
  index,
} from 'drizzle-orm/pg-core'

export const UsersTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    }
  }
)

export const ThemesTable = pgTable(
  'themes',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
    public: boolean('public').notNull().default(false),
    uiColors: json('ui_colors').notNull(),
    syntaxColors: json('syntax_colors').notNull(),
    ansiColors: json('ansi_colors').notNull(),
    baseHue: integer('base_hue').notNull(),
    uiSaturation: integer('ui_saturation').notNull(),
    syntaxSaturation: integer('syntax_saturation').notNull(),
    scheme: text('scheme').notNull(),
    isDark: boolean('is_dark').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (themes) => {
    return {
      idIdx: index('id_idx').on(themes.id),
      nameUserIdIdx: uniqueIndex('name_user_id_idx').on(
        themes.name,
        themes.userId
      ),
    }
  }
)
