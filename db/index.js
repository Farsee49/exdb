const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/post3');

async function createUser({
    username,
    password,
    name,
    location
     }) {
        try {
            const {rows: [user]} = await client.query(`
            INSERT INTO users(username, password, name, location)
                VALUES($1, $2, $3, $4)
                ON CONFLICT (username) DO NOTHING
            RETURNING*;
            `,[username, password, name, location]);
            return user;
                } catch (error){
                    throw error,
                    console.error(`Error creating user: ${error}`)  
        }
};



async function updateUser(id, fields = {}) {
    const setString =Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    if (setString.length === 0) {
        return;
    }
    try { 
        const { rows: [user] } = await client.query(`
        UPDATE users
        Set ${setString}
        WHERE id = ${id}
        RETURNING*;
        `, Object.values(fields));
        return user;
        }catch (error) {
            throw error;
            console.error(`Error updating user: ${error}`);
        }
};

async function getUserById(userId) {
    try{
        const { rows: [user] } = await client.query(`
        SELECT id, username, name, location
        FROM users
        WHERE id=${userId};
        `);
        if (!user) {
            throw {
                name: "UserNotFoundError",
                message: "Could not find a user with that userId"
            }
          }
          user.posts = await getPostsByUser(userId);
            return user;
        } catch (error) {
            throw error;
            console.error(`Error getting user by ID: ${error}`);
    }
};

async function getAllUsers() {
    try {
        const { rows: users } = await client.query(
        "SELECT * FROM users;")
        return users;
    } catch (error) {
        throw error;
        console.error(`Error getting users: ${error}`);
    }
}

async function createPost({
    authorId,
    title,
    content
}) {
    try {
        const { rows: [post] } = await client.query(`
        INSERT INTO posts("authorId", title, content)
        VALUES($1, $2, $3)
        RETURNING*;
        `, [authorId, title, content]);
        return post;
    } catch (error) {
        throw error;
        console.error(`Error creating post: ${error}`);
    }
};

async function updatePost(postId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [post] } = await client.query(`
        UPDATE posts
        SET ${setString}
        WHERE id=${postId}
        RETURNING*;
        `, Object.values(fields));
        return post;
    } catch (error) {
        throw error;
        console.error(`Error updating post: ${error}`);
    }
};

async function getAllPosts() {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM posts;
        `);
        return rows;
    } catch (error) {
        throw error;
        console.error(`Error getting posts: ${error}`);
    }
};

async function getPostsByUser(userId) {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM posts
        WHERE "authorId"=${userId};
        `);
        return rows;
    } catch (error) {
        throw error;
        console.error(`Error getting posts by user: ${error}`);
    }
}


module.exports = {
    client,
    createUser,
    getAllUsers,
    updateUser,
    getUserById,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser
};






