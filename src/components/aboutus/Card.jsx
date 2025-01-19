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
        <Card className="mt-6 w-96 border-2 border-dark-navy">
            <CardHeader color="blue-gray" className="relative ">
                <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                    className="w-full h-48 object-cover rounded-b-none"
                />
            </CardHeader>
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

CardDefault.propTypes = {
    desk: PropTypes.string,
};
