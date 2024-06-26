

const {
    client,
    createUser,
    getAllUsers,
    updateUser,
    getUserById,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser
} = require('./index');

async function dropTables() {
    try {
        console.log('Starting to drop tables...');

        await client.query(`
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        `);
        console.log('Finished dropping tables!');
    } catch (error) {
        console.error('Error dropping tables!');
        throw error;
    }
};

async function createTables() {
    try {
        console.log('Starting to build tables...');

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            active BOOLEAN DEFAULT true
        );
        CREATE TABLE posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) ,
            content TEXT ,
            active BOOLEAN DEFAULT true
        );
        `);
        console.log('Finished building tables!');
    }catch (error) {
        console.error('Error building tables!');
        throw error;
    }
};

async function createInitialUsers() {
    try {
        console.log('Starting to create users...');

        await createUser({ 
            username: 'Tam1',
            password: 'password',
            name: 'Tammy',
            location: 'California'
        });
        await createUser({ 
            username: 'TIceDog',
            password: 'password',
            name: 'Pete',
            location: 'UK'
        });
        await createUser({ 
            username: 'Hawk',
            password: 'password',
            name: 'Bob',
            location: 'Arkansas'
        });
        console.log('Finished creating users!');
    } catch (error) {
        console.error('Error creating users!');
        throw error;
    }
};

async function createInitialPosts() {
    try {
        const [tammy, pete, bob] = await getAllUsers();

        console.log('Starting to create posts...');

        await createPost({
          
            title: 'How to make the perfect sandwich',
            content: 'Doesn\'t it seem like a lot of people have forgotten how to make a good sandwich?'
        });
        await createPost({
            
            title: 'So you like football?',
            content: 'I think football is a pretty cool game'
        });
        await createPost({
           
            title: 'Best Places to Fish',
            content: 'I have been thinking about going fishing for a while now'
        });
        console.log('Finished creating posts!');
    } catch (error) {
        console.error('Error creating posts!');
        throw error;
    }
};



async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialPosts();

    } catch (error) {
        console.error('Error rebuilding database!');
        throw error;
    }
};

async function testDB() {
    try {
        console.log('Starting to test database...');

        console.log('Calling getAllUsers...');
        const users = await getAllUsers();
        console.log('Result:', users);

        console.log('Calling updateUser on users[0]...');
        const updateUserResult = await updateUser(users[0].id, {
            name: 'Newname Sogood',
            location: 'Lesterville, KY'
        });
        console.log('Result:', updateUserResult);

        console.log('Calling getAllPosts...');
        const posts = await getAllPosts();
        console.log('Result:', posts);

        console.log('Calling updatePost on posts[0]...');
        const updatePostResult = await updatePost(posts[0].id, {
            title: 'New Title',
            content: 'Updated Content'
        });
        console.log('Result:', updatePostResult);

        console.log('Calling getUserById with 1...');
        const getUserByIdResult = await getUserById(1);
        console.log('Result:', getUserByIdResult);

        console.log('Finished testing database!');
    } catch (error) {
        console.error('Error testing database!');
        throw error;
    }
};


rebuildDB()
    //.then(testDB)
    .catch(console.error)
    .finally(() => client.end());