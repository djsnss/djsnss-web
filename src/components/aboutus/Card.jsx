import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function CardDefault({ desk }) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(desk.link);
    };

    return (
        <Card className="mt-6 w-80 border-2 border-dark-navy">
            <img
                src={desk.image} // Use the image from the desk object
                alt={`${desk.name} image`} // Improve accessibility
                className="w-full object-cover rounded-t-xl rounded-b-none"
            />
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="">
                    {desk.name}
                </Typography>
                <Typography>
                    {desk.role}
                </Typography>
                <Button
                    onClick={handleNavigation}
                    className="bg-light-navy-blue text-white hover:bg-dark-navy duration-300"
                >
                    Read More
                </Button>
            </CardBody>
        </Card>
    );
}

export default CardDefault;

// Update PropTypes to reflect the object structure
CardDefault.propTypes = {
    desk: PropTypes.shape({
        link: PropTypes.string.isRequired, // Ensure the 'link' is a string
        name: PropTypes.string.isRequired, // Ensure the 'name' is a string
        role: PropTypes.string.isRequired, // Ensure the 'role' is a string
        image: PropTypes.string.isRequired, // Ensure the 'image' is a string
    }).isRequired,
};
