import { Spinner as BootstrapSpinner } from 'react-bootstrap';

function Spinner() {
    return (
        <BootstrapSpinner
            animation="border"
            role="status"
            variant="light"
            size="sm"
        >
            <span className="visually-hidden">Loading...</span>
        </BootstrapSpinner>
    );
}

export default Spinner;
