import { LoadButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <LoadButton type="button " onClick={onClick}>
      Load more
    </LoadButton>
  );
};

LoadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
