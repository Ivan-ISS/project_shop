import { useNavigate } from 'react-router-dom';

export default function Showcase() {
    const navigate = useNavigate();

    return (
        <h1>
            Showcase
            <p onClick={() => navigate('/12345')}>productClick</p>
        </h1>
    );
}