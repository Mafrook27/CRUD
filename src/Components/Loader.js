import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor:'rgba(163, 163, 163, 0.55)',
        zIndex: 500,
      }}
    >
      <Spinner animation="border" role="status" variant="primary" />
      <div className="mt-3">
        <strong>loading...</strong>
      </div>
    </div>
  );
};

export default Loader;