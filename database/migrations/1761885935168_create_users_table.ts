import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_user').primary()
      table.string('email', 191).notNullable().unique()
      table.string('username', 191).notNullable().unique()
      table.string('password', 255).notNullable()
      table.timestamp('created_at', { useTz: false }).nullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: false }).nullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
