class Model {
  constructor(tableName, knex) {
    this.tableName = tableName
    this.knex = knex
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.knex(this.tableName).then(item => resolve(item))
    })
  }

  findWithFilters(criteria) {
    return new Promise((resolve, reject) => {
      this.knex(this.tableName)
        .where(criteria)
        .then(items => resolve(items))
    })
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.knex(this.tableName)
        .where('id', id)
        .then(item => resolve(item))
    })
  }

  create(newItem) {
    return new Promise((resolve, reject) => {
      this.knex(this.tableName)
        .insert(newItem)
        .returning('*')
        .then(item => resolve(item))
    })
  }

  batchCreate(arrOfNewItems) {
    let newItems = arrOfNewItems.map(item => {
      return this.knex(this.tableName)
        .insert(item)
        .returning('*')
    })
    return Promise.all(newItems).then(results => {
      return results.map(item => item[0])
    })
  }

  findByFieldAndUpdate(fieldName, fieldVal, item) {
    return new Promise((resolve, reject) => {
      this.knex(this.tableName)
        .update(item)
        .where(fieldName, fieldVal)
        .returning('*')
        .then(item => resolve(item))
    })
  }

  findByIdAndUpdate(id, item) {
    return new Promise((resolve, reject) => {
      this.knex(this.tableName)
        .update(item)
        .where('id', id)
        .returning('*')
        .then(item => resolve(item))
    })
  }

  findByIdAndRemove(id, item) {
    return new Promise((resolve, reject) => {
      this.knex(this.tableName)
        .where('id', id)
        .del()
        .returning('*')
        .then(item => resolve(item))
    })
  }
}

module.exports = Model
