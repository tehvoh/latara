const { Pool, Client } = require('pg')

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens

const pool = new Pool({
  user: 'cayvo',
  host: 'localhost',
  database: 'latara',
  password: 'Gikonyo5935',
  port: 5432,
})


const client = new Client({
  user: 'cayvo',
  host: 'localhost',
  database: 'latara',
  password: 'Gikonyo5935',
  port: 5432,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// promise - checkout a client
pool
  .connect()
  .then(client => {
    return client
      .query('SELECT * FROM users WHERE id = $1', [1])
      .then(res => {
        client.release()
        console.log(res.rows[0])
      })
      .catch(e => {
        client.release()
        console.log(e.stack)
      })
  })

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
