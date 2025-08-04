

import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
      <Spinner animation="border" role="status" variant="primary" />
      <div className="mt-3">
        <strong>loading...</strong>
      </div>
    </div>
  );
};

export default Loader;
