const Logger = require('../common/logger')

const logger = new Logger()

const typeOf = (obj, match) => equals(Object.prototype.toString.call(obj).toLowerCase(), `object ${match}`)
const equals = (obj, match) => obj.toString().match(match)?.length > 0 ?? false

const addObject = (key = undefined, field) => {
  if (typeOf(field, 'array')) {
    const obj = {}
    field.forEach(item => obj[item.name] = addObject(item.name, item))
    return obj
  }

  if (equals(field?.type?.type ?? field.type, 'record')) {
    return addObject(field.name, field.fields ?? field.type)
  }

  if (equals(field.type, 'string')) return field.default ?? ''
  if (equals(field.type, 'long')) return field.default ?? 1
  if (equals(field.type, 'enum')) return field.default ?? field.symbols[0]
  if (equals(field.type, 'boolean')) return field.default ?? false
  if (equals(field.type, 'map')) return field.default ?? {}
  if (equals(field.type, 'array')) return [addObject(field.name ?? key, field.items)]

  if (equals(field.type, 'object')) {
    if (Array.isArray(field.type)) {
        let obj = {}
        field.type.forEach(objectField => {
          if (equals(objectField, 'object')) obj = addObject(field.name ?? key, objectField)
        })
        return obj
    } else {
      return addObject(field.name, field.type)
    }
  }

  logger.error({data: field, message: 'Error Field'})
}

const exec = (avsc) => {
  const json = {}
  avsc.fields.forEach(field => json[field.name] = addObject(field.name, field))
  return JSON.stringify(json)
}

module.exports = {
  exec
}
