require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const toggleSchedule = require('../toggle-schedule')
const retrieveAvailableSchedule = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor } } = require('wheely-data')

describe('logic - retrieve available schedule instructor', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student, adminId, feedback, puntuation

  beforeEach(async () => {
    // create an instructor
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'instructor'

    await User.deleteMany()
    let instructor = await User.create({ name, surname, email, password, role })
    instructor.profile = new Instructor()
    await instructor.save()
    instructorId = instructor.id

    // create an admin
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'admin'

    let admin = await User.create({ name, surname, email, password, role })
    adminId = admin.id
  })

  it('should succeed on retrieve instructor schedule', async () => {
/*    const day1 = { index: 3, hours: [11] }*/
    let indexDay1 = 1
    let indexDay2 = 1
    let indexDay3 = 2
    let indexDay4 = 2
    const hour1 = '12:00'
    const hour2 = '11:00'
    const hour3 = '09:00'
    const hour4 = '09:00'

    instructor = await toogleSchedule(adminId, instructorId, indexDay1, hour1)
    instructor = await toogleSchedule(adminId, instructorId, indexDay2, hour2)
    instructor = await toogleSchedule(adminId, instructorId, indexDay3, hour3)
    instructor = await toogleSchedule(adminId, instructorId, indexDay4, hour4)
debugger
    expect(instructor).to.exist
    expect(instructor.profile).to.exist
    expect(instructor.profile.schedule).to.exist

    let schedule = await retrieveAvailableSchedule(instructorId)

  })

/*  it('should fail on unexisting instructor', async () => {
    const hour4 = '09:00'
    let indexDay4 = 2
    let fakeId = '012345678901234567890123'
    try {
      instructor = await toogleSchedule(adminId, fakeId, indexDay4, hour4)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })*/

/*  it('should fail on unexisting admin', async () => {
    const hour4 = '09:00'
    let indexDay4 = 2
    let fakeId = '012345678901234567890123'
    try {
      instructor = await toogleSchedule(fakeId, instructorId, indexDay4, hour4)

      throw Error('should not reach this point')

    } catch (error) {
      expect(error).to.exist
      expect(error.message).to.exist
      expect(typeof error.message).to.equal('string')
      expect(error.message.length).to.be.greaterThan(0)
      expect(error.message).to.equal(`user with id ${fakeId} not found`)
    }
  })*/

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
