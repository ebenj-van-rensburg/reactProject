import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/api';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Row, Col, Form } from 'react-bootstrap';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getAllUsers();
            setUsers(usersData);
        };
        fetchUsers();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container className="my-4">
            <Row>
                <Col>
                    <h1>Search Users</h1>
                    <Form.Control
                        type="text"
                        placeholder="Search by username"
                        value={search}
                        onChange={handleSearchChange}
                        className="mb-4"
                    />
                    <ListGroup>
                        {filteredUsers.map(user => (
                            <ListGroup.Item key={user._id}>
                                <Link to={`/profile/${user._id}`} className="text-primary">{user.username}</Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;