import React, { useEffect, useState } from 'react'
import { Table } from 'evergreen-ui'
const axios = require('axios').default;

const Home = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([])

    const getUsers = () => {
        axios.get('http://localhost:5000/users/all/' + user._id, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }).then((users) => setUsers(users.data))


    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <main >
            {user.rol === 'admin' ? (
                    <Table>
                        <Table.Head width={500}>
                            <Table.TextHeaderCell>Nombre</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Email</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {users.map((profile) => (
                                <Table.Row key={profile._id} isSelectable>
                                    <Table.TextCell>{profile.name}</Table.TextCell>
                                    <Table.TextCell>{profile.email}</Table.TextCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
            ) : (
                <div>

                </div>
            )}

        </main>
    )
}

export default Home;