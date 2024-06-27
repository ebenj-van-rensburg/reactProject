import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/api';
import { Container, Card } from 'react-bootstrap';

const BlogPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPostById(postId);
            setPost(postData);
        };

        fetchPost();
    }, [postId]);

    return (
        <Container className="my-4">
            {post && (
                <Card>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>
                        <Card.Text className="text-muted">by {post.user.username}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default BlogPage;