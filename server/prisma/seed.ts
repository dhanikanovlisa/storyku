import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker"; 

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.stories.deleteMany()
    console.log('Deleted records in stories table')

    await prisma.chapters.deleteMany()
    console.log('Deleted records in chapters table')

    await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
    console.log('reset product auto increment to 1')

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    console.log('reset category auto increment to 1')

    for (let i = 0; i < 20; i++) {
        await prisma.stories.create({
            data: {
                title: faker.lorem.words(5),
                author: faker.person.fullName(),
                synopsis: faker.lorem.paragraph(),
                category: faker.helpers.arrayElement(['Financial', 'Technology', 'Health']),
                status: faker.helpers.arrayElement(['Publish','Draft']),
                cover: faker.image.url(),
                keyword: faker.lorem.words(5)
            }
        })
    }
    console.log('Added stories data')
  } catch (e) {
    console.error(e)
    // process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()