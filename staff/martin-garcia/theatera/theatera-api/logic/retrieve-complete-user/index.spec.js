require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveCompleteUser = require('.')
const { errors: { NotFoundError } } = require('theatera-util')
const { database, models: { User, Person } } = require('theatera-data')

describe('logic - retrieve-complete-user', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, email, password, rol, img, introduction, city, description, skills, experience, surname

    beforeEach(async() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
            /* random() */
        random() > 0.5 ? rol = 'COMPANY' : rol = 'PERSON'
        introduction = `introduction-${random()}`
        description = `description-${random()}`
        description = description.slice(0, 140)
        city = `city-${random()}`
        skills

        await User.deleteMany()

        if (rol === 'PERSON') {
            surname = `surname-${random()}`
            const specificInfo = await Person.create({ surname })
            const user = await User.create({ name, email, password, rol, introduction, specificInfo })
            id = user.id
        } else {
            const specificInfo = await Person.create({})
            const user = await User.create({ name, email, password, rol, introduction, specificInfo })
            id = user.id
        }


    })

    it('should succeed on correct user id', async() => {
        const user = await retrieveCompleteUser(id)
        let _introduction
        introduction.length > 20 ? _introduction = introduction.slice(0, 20) + '...' : _introduction = introduction


        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')
        expect(user._id).to.not.exist
        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')
        expect(user.password).to.be.undefined
        expect(user.introduction).to.equal(_introduction)
        expect(user.introduction).to.be.a('string')

        if (rol === 'PERSON')
            expect(user.surname).to.be.equal(surname)

        /* img test? */

    })

    it('should fail on wrong user id', async() => {
        const id = '012345678901234567890123'

        try {
            await retrieveCompleteUser(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})