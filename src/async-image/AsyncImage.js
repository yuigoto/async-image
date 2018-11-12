import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import classnames from "classnames";

/**
 * AsyncImage
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AsyncImage extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      has_error: false,
      image_loaded: false,
      loading_finished: false,
      source: null
    };

    this._fetchImageFromSrc = this._fetchImageFromSrc.bind(this);
    this.renderImageOrPlaceholder = this.renderImageOrPlaceholder.bind(this);
  }

  // Methods
  // --------------------------------------------------------------------

  /**
   * @private
   */
  async _fetchImageFromSrc() {
    const { props, state } = this;

    if (state.image_loaded === false) {
      try {
        const load = await axios.get(
          props.src,
          {
            responseType: "arraybuffer"
          }
        );

        if (load.data instanceof ArrayBuffer) {
          let buffer = new Buffer(load.data, "binary").toString("base64");
          let mime = load.headers["content-type"];
          let data = `data:${mime};base64,${buffer}`;

          this.setState({
            image_loaded: true,
            source: data
          });
        } else {
          this.setState({
            has_error: true,
            image_loaded: true
          });

          console.error("Received data is not a valid array buffer.");
        }
      } catch (err) {
        this.setState({
          has_error: true,
          image_loaded: true
        });

        console.error(err);
      }
    }
  }

  /**
   * Conditional renderer.
   */
  renderImageOrPlaceholder() {
    const { props, state } = this;

    let _cls_error = (props.errorClass !== "")
      ? props.errorClass
      : "async-image-error";
    let _cls_loader = (props.loaderClass !== "")
      ? props.loaderClass
      : "async-image-loader";
    let _cls_image_placeholder = (props.loaderClass !== "")
      ? props.loaderClass
      : "async-image-placeholder";
    let _cls_image = (props.imageClass !== "")
      ? props.imageClass
      : "async-image-item";

    if (state.has_error === true) {
      return (
        <span className={"async-image-error"}>Could not load image.</span>
      );
    }

    if (state.image_loaded === false) {
      if (
        props.placeholderImage !== ""
        && props.placeholderImage !== null
        && props.placeholderImage !== undefined
      ) {
        return (
          <img
            src={props.placeholderImage}
            alt={props.alt}
            className={"async-image-placeholder"}/>
        );
      }

      return (
        <span className={"async-image-loading"}></span>
      );
    }

    return (
      <img src={state.source} alt={props.alt} className={"async-image-item"}/>
    );
  }

  // React Lifecycle
  // --------------------------------------------------------------------

  componentDidMount() {
    this._fetchImageFromSrc();
  }

  componentDidUpdate() {
    const { state } = this;
  }

  render() {
    const { props } = this;
    let _cls = (props.className) ? classnames(props.className) : "async-image";

    return (
      <div className={_cls}>
        {this.renderImageOrPlaceholder()}
      </div>
    );
  };
}

// Prop validation
// ----------------------------------------------------------------------
AsyncImage.defaultProps = {
  className: "",
  errorClass: "",
  imageClass: "",
  loaderClass: "",
  placeholderClass: "",
  placeholderImage: ""
}

AsyncImage.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  errorClass: PropTypes.string,
  imageClass: PropTypes.string,
  loaderClass: PropTypes.string,
  placeholderClass: PropTypes.string,
  placeholderImage: PropTypes.string
};

export default AsyncImage;
