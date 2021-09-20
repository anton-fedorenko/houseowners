async function routes(fastify, options) {
    const housesCollection = fastify.mongo.db.collection('houses')

    const pages = {
        feed: {
            label: 'Новости',
            template: 'feed.njk',
        },
        organizations: {
            label: 'Организации',
            template: 'organizations.njk',
            path: "organizations"
        },
        about: {
            label: 'Информация',
            template: 'about.njk',
            path: "about"
        }
    }

    fastify.get('/houses/:identifier', async (request, reply) => {
        const postsCollection = fastify.mongo.db.collection('posts')
        const notificationsCollection = fastify.mongo.db.collection('notifications')
        const identifier = request.params.identifier
        const page = parseInt(request.query.page, 10) || 1
        const house = await housesCollection.findOne({ page: identifier })
        if (!house) {
            throw new Error('House not found: ' + identifier)
        }
        
        const houseId = house._id
        const pageLimit = 3;
        const count = await postsCollection.count({houseRef: houseId})
        const skip = (page - 1) * pageLimit
        const posts = await postsCollection.find({houseRef: houseId})
            .sort({"created.time": -1})
            .skip(skip)
            .limit(pageLimit)
            .toArray()
        const appPageRef = getPageRef(house, pages.feed)
        const pagination = getPagination(appPageRef, page, count, pageLimit)
        
        const notifications = await notificationsCollection.find({houseRef: houseId, date: {$gt: "2021-09-05"}}).toArray()
        
        return renderWithContext(reply, pages.feed, house, 
            { posts: posts, notifications: notifications, pagination: pagination })
    })

    function getPagination(baseRef, page, count, pageLimit) {
        const pagination = {
            enabled: count > pageLimit,
            currentPage: page
        }
        if (count > page * pageLimit) {
            const nextPage = page + 1
            pagination.nextRef = baseRef + `?page=` + nextPage
        }
        if (page > 1) {
            const prevPage = page - 1
            pagination.previousRef = baseRef + `?page=` + prevPage
        }
        return pagination
    }

    fastify.get('/houses/:identifier/about', async (request, reply) => {
        const identifier = request.params.identifier
        const house = await housesCollection.findOne({ page: identifier })
        if (!house) {
          throw new Error('House not found: ' + identifier)
        }
        return renderWithContext(reply, pages.about, house, { house: house })
    })

    fastify.get('/houses/:identifier/organizations', async (request, reply) => {
        const organizationsCollection = fastify.mongo.db.collection('organizations')
        const personsCollection = fastify.mongo.db.collection('persons')

        const identifier = request.params.identifier
        const house = await housesCollection.findOne({ page: identifier })
        if (!house) {
          throw new Error('House not found: ' + identifier)
        }
        const organizations = await organizationsCollection.find({ _id: { $in: house.organizations } }).toArray()
        const personsRefs = organizations
            .filter(org => !!org.persons)
            .flatMap(org => org.persons)
            .map(person => person.ref)
        const persons = await personsCollection.find({ _id: { $in: personsRefs } }).toArray()
        const personsMap = persons.reduce((map, person) => {
            map[person._id] = person;
            return map;
        }, {});
        organizations
            .filter(org => !!org.persons)
            .forEach(org => {
                org.persons.forEach(personItem => {
                    personItem.person = personsMap[personItem.ref]
                })
            })
        return renderWithContext(reply, pages.organizations, house, { organizations: organizations })
    })

    function renderWithContext(reply, currentPage, house, data) {
        const menu = Object.keys(pages).map(pageKey => {
            const pageItem = pages[pageKey]
            const segments = ['houses', house.page];
            if (pageItem.path) segments.push(pageItem.path)
            const ref = getPageRef(house, pageItem)
            return {label: pageItem.label, ref: ref, active: pageItem === currentPage}
        })
        const context = {
            siteArea: house.name,
            pageHeader: currentPage.label,
            menu: menu
        }
        return reply.view('/templates/house/' + currentPage.template, { context: context, data: data })
    }

    function getPageRef(house, page) {
        const segments = ['houses', house.page]
        if (page.path) segments.push(page.path)
        return '/' + segments.join('/')
    }
}

module.exports = routes