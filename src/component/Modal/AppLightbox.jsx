import React from "react";
import PropTypes from "prop-types";
import Carousel, { Modal, ModalGateway } from "react-images";
import ErrorBoundary from "component/ErrorBoundary";

export class AppLightbox extends React.Component {

  state = {
    photoIndex: 0
  };

  static propTypes = {
    action:  PropTypes.shape({
      setApp: PropTypes.func.isRequired
    }),
    isVisible: PropTypes.any.isRequired,
    data: PropTypes.object.isRequired
  }

  onClose = () => {
    this.props.action.setApp({ appLightbox: false });
  }

  // Do not update until visible
  shouldComponentUpdate( nextProps ) {
    if ( this.props.data !== nextProps.data ) {
      return true;
    }
    if ( this.props.isVisible !== nextProps.isVisible ) {
      return true;
    }
    if ( nextProps.isVisible === false ) {
      return false;
    }
    return true;
  }

  render() {
    const { photoIndex } = this.state,
          { isVisible, data } = this.props;
        console.log("lightbox", data);
    return ( <ErrorBoundary>
      <ModalGateway>
        { isVisible !== false ? (
          <Modal onClose={ this.onClose }>
            <ErrorBoundary>
              <Carousel views={ data.images } currentIndex={ data.index } />
            </ErrorBoundary>
          </Modal>
        ) : null}
      </ModalGateway>
      </ErrorBoundary> );
  }
}