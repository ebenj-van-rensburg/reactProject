import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, getPostsByUser, createPost } from '../services/api';
import { Form, Button, Container, Row, Col, ListGroup, Card } from 'react-bootstrap';

const ProfilePage = ({ user }) => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isCurrentUser, setIsCurrentUser] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (userId) {
                // Fetch profile for the user from the URL parameter
                const profileData = await getUserProfile(user.token);
                setProfile(profileData);
            } else if (user) {
                // Fetch profile for the current logged-in user
                setProfile(user);
                setIsCurrentUser(true);
            }
        };

        const fetchPosts = async () => {
            const id = userId || user._id;
            if (id) {
                const postsData = await getPostsByUser(id);
                setPosts(postsData);
            }
        };

        fetchProfile();
        fetchPosts();
    }, [userId, user]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!title || !content) return;

        const newPost = await createPost({ title, content }, user.token);
        setPosts([...posts, newPost]);
        setTitle('');
        setContent('');
    };

    return (
        <Container>
            {profile && (
                <>
                    <Row className="my-4">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{profile.username}'s Profile</Card.Title>
                                    <Card.Text>Email: {profile.email}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}

            {isCurrentUser && (
                <Row className="my-4">
                    <Col>
                        <h2>Create a New Post</h2>
                        <Form onSubmit={handleCreatePost}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter post title"
                                />
                            </Form.Group>
                            <Form.Group controlId="content" className="mt-3">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={3}
                                    placeholder="Enter post content"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Create Post
                            </Button>
                        </Form>
                    </Col>
                </Row>
            )}

            <Row className="my-4">
                <Col>
                    <h2>Posts</h2>
                    <ListGroup>
                        {posts.map(post => (
                            <ListGroup.Item key={post._id}>
                                <a href={`/blog/${post._id}`} className="text-primary">{post.title}</a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
