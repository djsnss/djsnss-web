import {
    Card,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/about.css';

function CardDefault({ desk }) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(desk.link);
    };

    return (
        <Card className="mt-6 w-60 border-2 border-dark-navy">
            <img
                src={desk.image}
                alt={`${desk.name} image`}
                className="w-full object-cover rounded-t-xl rounded-b-none"
            />
            <div className="p-2">
                <Typography variant="h5" color="blue-gray" className="font-semibold">
                    {desk.name}
                </Typography>
                <Typography className="text-sm text-gray-600">
                    {desk.role}
                </Typography>
                <Button
                    onClick={handleNavigation}
                    className="mt-1 p-2 w-max rounded-lg about-button"
                >
                    Read More
                </Button>
            </div>
        </Card>
    );
}

export default CardDefault;

CardDefault.propTypes = {
    desk: PropTypes.shape({
        link: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};
